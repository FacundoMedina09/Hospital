import { Request, Response } from "express";
import bcrypt from 'bcrypt';//Para encriptar datos
import Speciality from "../models/speciality.models";//Importacion de la especialidad
import User from "../models/user.models";


//Constante para mostrar las especialidades que hay en nuestra base de datos
export const getSpeciality= async (req: Request, res:Response) =>{
    const listSpecialitys = await Speciality.findAll();
    res.json(listSpecialitys);
}

export const newSpeciality = async (req: Request, res: Response) => {
    const {name} = req.body; //Extrae el body de nuestro requisito

    //Validamos que la especialidad no exista en la db mediante el nombre
    const speciality = await Speciality.findOne({where: {name: name}});

    if(speciality){//Si existe se imprime el caso
         res.status(400).json({msg:`Especialidad ${name} ya existe`});
    }
    else{   //Si la especialidad no existe, se permite el ingreso a la db
        try{
            await Speciality.create({ //Incresamos un nuevo usuario a la db
                name: name,
            });
            res.status(201).json({msg: `Especialidad ${name} creado exitosamente`});//Mensaje de exito
        }
        catch(error){
            res.status(500).json({msg:`Ocurrio un error: ${error}`})
        }
    }

}