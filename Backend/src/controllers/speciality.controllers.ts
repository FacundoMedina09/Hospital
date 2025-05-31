import { Request, Response } from "express";
import bcrypt from 'bcrypt';//Para encriptar datos
import Speciality from "../models/speciality.models";//Importacion de la especialidad


//Constante para mostrar las especialidades que hay en nuestra base de datos
export const getSpeciality= async (req: Request, res:Response) =>{
    const listSpecialitys = await Speciality.findAll();
    res.json(listSpecialitys);
}