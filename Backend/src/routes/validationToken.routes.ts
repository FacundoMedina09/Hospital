import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { json } from 'sequelize';

//Constante para validad el token de usuario
const validacionToken = (req: Request,res :Response, next: NextFunction) =>{
   
    const headerToken = req.headers['authorization']; //Capturamos el token que se esta utilizando
    
    //Si es distinto a undefined y comienza con "Bearer", muestra productos
    if (headerToken != undefined && headerToken.startsWith("Bearer")) {     
        //En esta instancia ya se tiene el token
        try {
            const bearerToken = headerToken.slice(7);//Recortamos "Bearer" y nos quedamos el token solo
            jwt.verify(bearerToken, process.env.SECRET_KEY || "password123")//Verificamos que el token no haya expirado y que no este corrupto
            next();
        } catch (error) {
            res.status(401).json({msg:`Token no valido`});
        }

    }//Si es igual a undefined y no comienza con "Bearer", el acceso es denegado
    else{                           
        res.status(401).json({msg:`Acceso denegado`})
    }

    
};

export default validacionToken;