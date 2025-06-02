import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/user.interfaces";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class Services{
    private myAppUrl: string;   // Variable donde vamos a almacenar nuestro localhost3001
    private registrarUser: string;

    constructor(private http: HttpClient,){
        this.myAppUrl = environment.endpoint;
        this.registrarUser = 'Hospital';
    }

    //Metodos para nuestra aplicacion 

    //Registrar nuevo usuario
    RegistrarUsuario(user: User): Observable<void>{
        return this.http.post<void>(`${this.myAppUrl}${this.registrarUser}`, user);
    }

}