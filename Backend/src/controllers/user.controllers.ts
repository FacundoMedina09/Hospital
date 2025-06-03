import { Request, Response } from "express";
import bcrypt from 'bcrypt';//Para encriptar datos
import User from "../models/user.models";//Importacion del usuario
import jwt from 'jsonwebtoken'; //Para generar token

//Constante que devuelve una respuesta mediante un requisito
//Nuevo Usuario
export const NewUser = async(req: Request, res: Response) =>{

    const {name, surname, email, password, rol} = req.body; //Extrae el body de nuestro requisito

    //Validamos que el usuario no exista en la db mediante su email
    const user = await User.findOne({where: {email: email}});

    if(user){  //Si el user existe, se imprime el caso
        res.status(400).json({msg:`User ${email} ya existe`});
    }
    else{   //Si el user no existe, se permite el ingreso a la db
        const hashPassword = await bcrypt.hash(password, 10);//Utilizamos bcrypt para encriptar la password
        try{
            await User.create({ //Incresamos un nuevo usuario a la db
                name: name,
                surname: surname,
                email: email,
                password: hashPassword, //Contraseña encriptada
                rol: rol
            });
            res.status(201).json({msg: `User ${email} creado exitosamente`});//Mensaje de exito
        }
        catch(error){
            res.status(500).json({msg:`Ocurrio un error: ${error}`})
        }
    }
}

//Constante que devuelve una respuesta mediante un requisito
//Login Usuario
export const LoginUser = async (req: Request, res: Response): Promise<void>=>{
    const {email, password, rol} = req.body; //Extrae el body de nuestro requisito

    //Validamos si el usuario existe en la db
    const user: any = await User.findOne({where: {email: email}});
    if(!user){//Si el user no existe, se imprime lo sucedido, caso contrario continua
        res.status(400).json({msg:`Correo ${email} no existe`});
    }

    // Validar rol
    if (user.rol !== rol) {
        res.status(403).json({ msg: `Acceso denegado: Rol incorrecto` });
        return;
    }


    //Validamos la contraseña 
    const passwordValida = await bcrypt.compare(password, user.password);//Comparamos la contraseña y la contraseña encriptada
    if(!passwordValida){ //Si es falso quiere decir que la contraseña es invalida, caso contrario continua
        res.status(400).json({msg: `Contraseña incorrecta`})
    }

    //Generamos el token
    const token = jwt.sign({    //Se envia el email y la SECRET_KEY, si no la encuentra usa password123
        email: email,
    },process.env.SECRET_KEY || "password123")

    res.json({token, id: user.id}) //Devolvemos el token generado


}
