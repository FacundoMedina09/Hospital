import { Request, Response } from "express";
import bcrypt from 'bcrypt';//Para encriptar datos
import Medic from "../models/medic.models";//Importacion del Medico
import User from "../models/user.models";
import Speciality from "../models/speciality.models";

//Constante para mostrar los medicos usuarios que hay en nuestra base de datos

export const getMedicsUsersSpeciality = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({ where: { rol: 'Medic' } });
    const medics = await Medic.findAll();
    const speciality = await Speciality.findAll();

    res.status(200).json({ users, medics,speciality });
  } catch (error) {
    console.error("Error al obtener usuarios y medicos:", error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

//Constante para agregar un medico a la base de datos
export const NewMedic = async (req: Request, res: Response) =>{
    const {phone, user_id, speciality_id } = req.body;
    
    //Validamos que el medico no exista en la db mediante su user_id
    const medic = await Medic.findOne({where: {user_id: user_id}});
    if(medic){  //Si el medic existe, se imprime el caso
        res.status(400).json({msg:`Medico ${user_id} ya existe`});
    }
    else{
        try{
            await Medic.create({
                phone: phone,
                user_id: user_id,
                speciality_id: speciality_id
            });
            res.status(201).json({msg: `Medico ${user_id} creado exitosamente`});//Mensaje de exito
        }
        catch(error){
            res.status(500).json({msg:`Ocurrio un error: ${error}`})
        }
    }
}