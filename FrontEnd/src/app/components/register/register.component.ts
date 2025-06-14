import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../../services/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user.interfaces';
import { Patient } from '../../interfaces/patient.interfaces';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formulario: FormGroup; //Creamos el formulario

  constructor(private router: Router,
    private aRouter: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private form: FormBuilder,
    private _services: Services,
    private toastr: ToastrService)
  {

    this.formulario = this.form.group({ //Instanciamos el formulario
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required],
    })
  }


  //Metodo por el cual creamos un usuario
  CrearUsuario() {
  // Crear usuario
  const nuevoUsuario = {
    name: this.formulario.value.name,
    surname: this.formulario.value.surname,
    email: this.formulario.value.email,
    password: this.formulario.value.password,
    rol: this.formulario.value.rol
  };
  this._services.RegistrarUsuario(nuevoUsuario).subscribe({
    next: (resp: any) => {
      this.toastr.success('Usuario creado correctamente');
      console.log(resp);
      this.dialogRef.close();
    },
    error: (err) => {
      this.toastr.error('Error al crear usuario');
      console.error(err);
    }
  });
}


  //Metodo por el cual cerramos la ventana
  CerrarVentana(){
    this.dialogRef.close();
  }
}
