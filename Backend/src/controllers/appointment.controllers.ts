import { Request, Response } from "express";
import bcrypt from 'bcrypt';//Para encriptar datos
import Appointment from "../models/appointment.models"; //Importacion de las citas medicas

//Constante para mostrar las disponibilidades medicas que hay en nuestra base de datos
export const getAppointment= async (req: Request, res:Response) =>{
    const listAppointment= await Appointment.findAll();
    res.json(listAppointment);
}

//Constante para agregar una cita medica a la base de datos
export const NewAppointment = async (req: Request, res: Response) =>{
    const {patient_id ,medic_id, date, state, observations} = req.body;
    
    //Validamos que la cita medica no exista en la db mediante su user_id
    const appointmentDate = await Appointment.findOne({where: {date: date}});
    const appointmentMedicID =  await Appointment.findOne({where: {medic_id: medic_id}});
    if(appointmentDate && appointmentMedicID){  //Si la cita medica existe, se imprime el caso
        res.status(400).json({msg:`Disponibilidad medica del medico ${medic_id} ya existe`});
    }
    else{
        try{
            await Appointment.create({
                patient_id: patient_id,
                medic_id: medic_id,
                date: date,
                state: state,
                observations: observations
            });
            res.status(400).json({msg: `Cita medica del medico ${medic_id} creado exitosamente`});//Mensaje de exito
        }
        catch(error){
            res.status(400).json({msg:`Ocurrio un error: ${error}`})
        }
    }
}