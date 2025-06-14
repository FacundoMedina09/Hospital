import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Services } from '../../services/services';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Speciality } from '../../interfaces/speciality.interfaces';
import { Medic } from '../../interfaces/medic.interfaces';

@Component({
  selector: 'app-admin-add',
  standalone: false,
  templateUrl: './admin-add.component.html',
  styleUrl: './admin-add.component.css'
})
export class AdminAddComponent {
  nuestraRuta: string = '';
  name: string = '';
  formulario: FormGroup;  //Creamos nuestro formulario 
  formularioMedico: FormGroup;
  listaUsersRolMedic: any[] = [];
  listaEspecialidades: Speciality[] = [];

  constructor(private router: Router,
    private form: FormBuilder,
    private _service: Services,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminAddComponent>)
  {
    this.nuestraRuta = this.router.url;
    this.formulario = this.form.group({//Vamos a instanciar y validar nuestro formulario 
      name: ['', Validators.required]
    })
    this.listaEspecialidades = data.listaEspecialidades || [];
    this.listaUsersRolMedic = data.listaUsersRolMedic.flat() || []; //.flat() aplana el array, es decir elimina el array externo(ya que esta vacio)
    this.formularioMedico = this.form.group({
      phone: ['', Validators.required],
      user_id: ['', Validators.required],
      speciality_id: ['', Validators.required]
    })
  }
  CrearMedico(){
    let usuario_id: any;
    let especialidad_id: any;
    for (let posicion = 0; posicion < this.listaEspecialidades.length; posicion++) {
      if(this.listaEspecialidades[posicion].id == this.formularioMedico.value.speciality_id ){
        console.log(this.listaEspecialidades[posicion]);
        especialidad_id = this.listaEspecialidades[posicion].id;
        break;
      } 
    }
    for (let posicion = 0; posicion < this.listaUsersRolMedic.length; posicion++) {
      if(this.listaUsersRolMedic[posicion].id == this.formularioMedico.value.user_id ){
         console.log(this.listaUsersRolMedic[posicion]);
        usuario_id = this.listaUsersRolMedic[posicion].id;
        break;
      } 
    }
    if (!especialidad_id || !usuario_id) {
      this.toastr.error("Error al encontrar el ID de usuario o especialidad");
      return;
    }
    const newMedico: Medic = {
      phone: this.formularioMedico.value.phone,
      user_id: usuario_id,
      speciality_id: especialidad_id
    }
    this._service.NewMedico(newMedico).subscribe(()=>{
      this.toastr.success('Médico registrado correctamente');
      this.dialogRef.close();
      location.reload();
    })
    
  }

  //Metodo por el cual creamos una nueva especialidad
  CrearEspecialidad(){
    //Validamos que el usuario ingrese los datos
    if(this.name == ''){
      this.toastr.error("Todos los campos son obligatorios","Error");
      return;
    }
    const newEspecialidad: Speciality = {
      name: this.formulario.value.name
    }
    this._service.NewEspecialidad(newEspecialidad).subscribe(() =>{//Ejecutamos el servicio para agregar la especialidad
      this.toastr.success(`${newEspecialidad.name} fue agregada a la base de datos.`, 'Especialidad registrado')
      location.reload();
    })
  }

  //Metodo por el cual cerramos la ventana emergente
  cerrarVentana(){
    this.dialogRef.close();
  }
}
