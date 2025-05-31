import { Request, Response } from "express";
import bcrypt from 'bcrypt';//Para encriptar datos
import MedicalAvailability from "../models/medicalAvailability.models";//Importacion de la disponibilidad medica

//Constante para mostrar las disponibilidades medicas que hay en nuestra base de datos
export const getMedicalAvailability = async (req: Request, res:Response) =>{
    const listMedicalAvailability= await MedicalAvailability.findAll();
    res.json(listMedicalAvailability);
}

//Constante para agregar un medico a la base de datos
export const NewMedicalAvailability = async (req: Request, res: Response) =>{
    const {medic_id, day, start_time, end_time} = req.body;
    
    //Validamos que el medico no exista en la db mediante su user_id
    const medicalAvailability = await MedicalAvailability.findOne({where: {medic_id: medic_id}});
    if(medicalAvailability){  //Si la disponibilidad medica existe, se imprime el caso
        res.status(400).json({msg:`Disponibilidad medica del medico ${medic_id} ya existe`});
    }
    else{
        try{
            await MedicalAvailability.create({
                medic_id: medic_id,
                day: day,
                start_time: start_time,
                end_time: end_time
            });
            res.status(400).json({msg: `Disponibilidad medica del medico ${medic_id} creado exitosamente`});//Mensaje de exito
        }
        catch(error){
            res.status(400).json({msg:`Ocurrio un error: ${error}`})
        }
    }
}