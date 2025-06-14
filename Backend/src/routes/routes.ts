import { Router } from "express";
import { LoginUser, NewUser} from "../controllers/user.controllers";
import { getMedicsUsersSpeciality, NewMedic } from "../controllers/medic.controllers";
import { getSpeciality, newSpeciality } from "../controllers/speciality.controllers";
import { getPatientsAndUsers, getPatientUnico, NewPatient } from "../controllers/patient.controllers";
import { getMedicalAvailability, NewMedicalAvailability } from "../controllers/medicalAvailability.controllers";
import { getAppointment, NewAppointment } from "../controllers/appointment.controllers";

const router = Router();

//User
//Nuevo Usuario
router.post('/Hospital', NewUser);
//Login Usuario
router.post('/Hospital/Login/Paciente', LoginUser);

//Medic
//Nuevo Medico
router.post('/Hospital/Admin/Medicos', NewMedic);
//Ver Medicos Usuarios
router.get('/Hospital/Admin/Medicos',getMedicsUsersSpeciality);

//Speciality
//Ver lista de especialidades
router.get('/Hospital/Admin/Especialidades', getSpeciality);
//Nueva Especialidad
router.post('/Hospital/Admin/Especialidades', newSpeciality);
//Ver Especialidades y usuarios
//router.get();


//Patient
//Nuevo Paciente
router.post('/Hospital/Home/Paciente/:idPatient', NewPatient);
//Ver paciente unico
router.get('/Hospital/Home/Paciente/:idPatient', getPatientUnico);
//Ver Pacientes Usuarios
router.get('/Hospital/Admin/Pacientes', getPatientsAndUsers);

//MedicalAvailability
//Nueva Disponibilidad Medica
router.post('/Dashboard/Admin/RegisterMedic/MedicalAvailability/:idMedic', NewMedicalAvailability);
//Ver Disponibilidad Medica
//router.get('/', getMedicalAvailability);

//Appointment
//Nueva cita medica
router.post('/Dashboard/Paciente/:idPatient/Appointment', NewAppointment);
//Ver las citas medicas
//router.get('', getAppointment);

export default router;