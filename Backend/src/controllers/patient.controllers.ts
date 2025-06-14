import { Request, Response } from "express";
import bcrypt from 'bcrypt';//Para encriptar datos
import Patient from "../models/patient.models";//Importacion del Paciente
import User from "../models/user.models";


//Constante para mostrar los pacientes usuarios que hay en nuestra base de datos

export const getPatientsAndUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({ where: { rol: 'Patient' } });
    const patients = await Patient.findAll();

    res.status(200).json({ users, patients });
  } catch (error) {
    console.error("Error al obtener usuarios y pacientes:", error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};


export const getPatientUnico = async (req: Request, res: Response): Promise<void> =>{
  const userId = req.params.idPatient

  try{
    const patient = await Patient.findOne({ where: { user_id: userId } });
    if (!patient) {
      res.status(404).json({ msg: `Paciente con id de usuario: ${userId} no existe`});
    }
    res.status(200).json({patient});
  }
  catch(error){
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }

}

//Constante para agregar un medico a la base de datos
export const NewPatient = async (req: Request, res: Response): Promise<void> => {
  const { user_id, dni, phone, direction, date_birt } = req.body;

  if (!user_id || !dni || !phone || !direction || !date_birt) {
    res.status(400).json({ msg: "Faltan datos obligatorios" });
  }
  try {
    const existingPatient = await Patient.findOne({ where: { dni } });
    if (existingPatient) {
      res.status(400).json({ msg: `Paciente con dni ${dni} ya existe` });
    }
    const newPatient = await Patient.create({
      user_id,
      dni,
      phone,
      direction,
      date_birt: new Date(date_birt),
    });

    res.status(201).json({ msg: `Paciente creado exitosamente`, patient: newPatient });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};