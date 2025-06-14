import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Services } from '../../services/services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  rutaActual: string = '';
  email: string = '';
  password: string = '';
  
  constructor(private router: Router,
    private _services: Services,
    private toastr: ToastrService)
  {
    this.rutaActual = this.router.url;
  }

  LoginPaciente(){
    //Validamos que el usuario ingrese los datos
    if(this.email == '' || this.password == ''){
      this.toastr.error("Todos los campos son obligatorios","Error");
      return;
    }
    const user  ={
      email: this.email,
      password: this.password,
      rol: 'Patient'
    }
    this._services.LoginUsuario(user).subscribe({
      next: (response: any) => {
      localStorage.setItem('token', response.token);
      this.toastr.success("Inicio de sesión exitoso", "Bienvenido");
      const userId = response.id
      this.router.navigate([`Hospital/Home/Paciente/${userId}`]);
    },
    error: (err) => {
      if (err.error.msg) {
        this.toastr.error(err.error.msg, "Error");
      } else {
        this.toastr.error("Ocurrió un error inesperado", "Error");
      }
    }
    })

  }


  LoginMedico(){
    //Validamos que el usuario ingrese los datos
    if(this.email == '' || this.password == ''){
      this.toastr.error("Todos los campos son obligatorios","Error");
      return;
    }
    const user  ={
      email: this.email,
      password: this.password,
      rol: 'Medic'
    }
    this._services.LoginUsuario(user).subscribe({
      next: (response: any) => {
      localStorage.setItem('token', response.token);
      this.toastr.success("Inicio de sesión exitoso", "Bienvenido");
      const userId = response.id
      this.router.navigate([`Hospital/Home/Medico/${userId}`]);
    },
    error: (err) => {
      if (err.error.msg) {
        this.toastr.error(err.error.msg, "Error");
      } else {
        this.toastr.error("Ocurrió un error inesperado", "Error");
      }
    }
    })

  }

  LoginAdmin(){
    //Validamos que el usuario ingrese los datos
    if(this.email == '' || this.password == ''){
      this.toastr.error("Todos los campos son obligatorios","Error");
      return;
    }
    const user  ={
      email: this.email,
      password: this.password,
      rol: 'Admin'
    }
    this._services.LoginUsuario(user).subscribe({
      next: (response: any) => {
      localStorage.setItem('token', response.token);
      this.toastr.success("Inicio de sesión exitoso", "Bienvenido");
      const userId = response.id
      this.router.navigate([`Hospital/Home/Admin/`]);
    },
    error: (err) => {
      if (err.error.msg) {
        this.toastr.error(err.error.msg, "Error");
      } else {
        this.toastr.error("Ocurrió un error inesperado", "Error");
      }
    }
    })
  }


}
