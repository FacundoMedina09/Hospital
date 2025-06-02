import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class Services{
    private myAppUrl: string;   // Variable donde vamos a almacenar nuestro localhost3000

    constructor(private http: HttpClient){
        this.myAppUrl = environment.endpoint;
    }

    //Metodos para nuestra aplicacion 
}