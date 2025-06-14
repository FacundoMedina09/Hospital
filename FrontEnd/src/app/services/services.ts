import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/user.interfaces";
import { Observable, switchMap } from "rxjs";
import { Speciality } from "../interfaces/speciality.interfaces";
import { Patient } from "../interfaces/patient.interfaces";
import { Medic } from "../interfaces/medic.interfaces";

@Injectable({
    providedIn: 'root'
})

export class Services{
    private myAppUrl: string;   // Variable donde vamos a almacenar nuestro localhost3001
    private registrarUser: string;
    private loginUsuario: string;
    private adminEspecialidad: string;
    private adminPacientes: string;
    private adminMedicos: string;
    private paciente: string;

    constructor(private http: HttpClient,){
        this.myAppUrl = environment.endpoint;
        this.registrarUser = 'Hospital';
        this.loginUsuario = 'Hospital/Login/Paciente';
        this.adminEspecialidad = 'Hospital/Admin/Especialidades';
        this.adminPacientes = 'Hospital/Admin/Pacientes';
        this.adminMedicos = 'Hospital/Admin/Medicos'
        this.paciente = 'Hospital/Home/Paciente/';
    }

    //Metodos para nuestra aplicacion 

    //Registrar nuevo usuario
    RegistrarUsuario(user: any): Observable<User>{
        return this.http.post<User>(`${this.myAppUrl}${this.registrarUser}`, user);
    }
    //Login Usuario, ya sea admin, medic o paciente
    LoginUsuario(user: any): Observable<any>{
        return this.http.post<any>(`${this.myAppUrl}${this.loginUsuario}`, user)
    }

    //Nueva especialidad
    NewEspecialidad(especialidad: Speciality): Observable<void>{
        return this.http.post<void>(`${this.myAppUrl}${this.adminEspecialidad}`, especialidad);
    }
    //Ver especialidades
    VerEspecialidades(): Observable<Speciality>{
        return this.http.get<Speciality>(`${this.myAppUrl}${this.adminEspecialidad}`);
    }
   
    //Nuevo Paciente
    NewPaciente(paciente: any, id: Number): Observable<void>{
        return this.http.post<void>(`${this.myAppUrl}${this.paciente}${id}`, paciente);
    }
    //Ver un paciente unico
    VerPaciente(id: Number): Observable<Patient>{
        return this.http.get<Patient>(`${this.myAppUrl}${this.paciente}${id}`);
    }
    //Ver lista de pacientes usuarios
    VerPacientesyUsuarios():  Observable<{ patients: Patient[], users: User[] }> {
        return this.http.get<{ patients: Patient[], users: User[] }>(`${this.myAppUrl}${this.adminPacientes}`);
    }

    //
    
    //Ver lista de medicos usuarios
    VerMedicosyUsuarios():  Observable<{ medics: Medic[], users: User[] }> {
        return this.http.get<{ medics: Medic[], users: User[] }>(`${this.myAppUrl}${this.adminMedicos}`);
    }

    //

    //Nuevo medico
    NewMedico(medico: any): Observable<void>{
        return this.http.post<void>(`${this.myAppUrl}${this.adminMedicos}`, medico);
    }


    


}