import { Router } from "express";
import { NewUser, LoginUser} from "../controllers/user.controllers";
import { getMedics, NewMedic } from "../controllers/medic.controllers";
import { getSpeciality } from "../controllers/speciality.controllers";
import { getPatients, NewPatient } from "../controllers/patient.controllers";
import { getMedicalAvailability, NewMedicalAvailability } from "../controllers/medicalAvailability.controllers";
import { getAppointment, NewAppointment } from "../controllers/appointment.controllers";

const router = Router();

//User
//Nuevo Usuario
router.post('/Hospital',NewUser );
//Login Usuario
router.post('/Hospital/Login/Paciente', LoginUser);

//Medic
//Nuevo Medico
router.post('/Dashboard/Admin/RegisterMedic/:idMedic', NewMedic);
//Ver Medicos
router.get('/',getMedics);

//Speciality
//Ver lista de especialidades
router.get('/', getSpeciality);

//Patient
//Nuevo Paciente
router.post('/Register/Paciente/:idUser',NewPatient);
//Ver Pacientes
router.get('/',getPatients);

//MedicalAvailability
//Nueva Disponibilidad Medica
router.post('/Dashboard/Admin/RegisterMedic/MedicalAvailability/:idMedic', NewMedicalAvailability);
//Ver Disponibilidad Medica
router.get('/', getMedicalAvailability);

//Appointment
//Nueva cita medica
router.post('/Dashboard/Paciente/:idPatient/Appointment', NewAppointment);
//Ver las citas medicas
router.get('', getAppointment);

export default router;