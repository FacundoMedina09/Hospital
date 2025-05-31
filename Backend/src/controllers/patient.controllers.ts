import { Request, Response } from "express";
import bcrypt from 'bcrypt';//Para encriptar datos
import Patient from "../models/patient.models";//Importacion del Paciente


//Constante para mostrar los pacientes que hay en nuestra base de datos
export const getPatients = async (req: Request, res:Response) =>{
    const listPatients = await Patient.findAll();
    res.json(listPatients);
}

//Constante para agregar un medico a la base de datos
export const NewPatient = async (req: Request, res: Response) =>{
    const {user_id, dni, phone, direction, date_birt } = req.body;
    
    //Validamos que el paciente no exista en la db mediante su user_id
    const patient = await Patient.findOne({where: {user_id: user_id}});
    if(patient){  //Si el medic existe, se imprime el caso
        res.status(400).json({msg:`Paciente ${user_id} ya existe`});
    }
    else{
        try{
            await Patient.create({
                user_id: user_id,
                dni: dni,
                phone: phone,
                direction: direction,
                date_birt: date_birt
            });
            res.status(400).json({msg: `Paciente ${user_id} creado exitosamente`});//Mensaje de exito
        }
        catch(error){
            res.status(400).json({msg:`Ocurrio un error: ${error}`})
        }
    }
}