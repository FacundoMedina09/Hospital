import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Services } from '../../services/services';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Speciality } from '../../interfaces/speciality.interfaces';
import { Medic } from '../../interfaces/medic.interfaces';
import { MedicalAvailability } from '../../interfaces/medicalAvailability.interfaces';

@Component({
  selector: 'app-admin-add',
  standalone: false,
  templateUrl: './admin-add.component.html',
  styleUrl: './admin-add.component.css'
})
export class AdminAddComponent {
  nuestraRuta: string = '';
  name: string = '';
  day: string = '';
  formularioEspecialidad: FormGroup;  //Creamos nuestro formulario 
  formularioMedico: FormGroup;
  formularioDisponibilidad: FormGroup;
  listaUsersRolMedic: any[] = [];
  listaEspecialidades: Speciality[] = [];
  listaDiasDisponible: any [] = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  listaEntradaHorariosDisponibles: any[] = ['08:00','09:00','10:00'];
  listaSalidasHorariosDisponibles: any[] = ['16:00','17:00','18:00'];
  idMedico: any;

  constructor(private router: Router,
    private form: FormBuilder,
    private _service: Services,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminAddComponent>)
  {
    this.nuestraRuta = this.router.url;

    this.formularioEspecialidad = this.form.group({//Vamos a instanciar y validar nuestro formulario 
      name: ['', Validators.required]
    })
    this.listaEspecialidades = data.listaEspecialidades || [];
    this.listaUsersRolMedic = data.listaUsersRolMedic.flat() || []; //.flat() aplana el array, es decir elimina el array externo(ya que esta vacio)
    this.formularioMedico = this.form.group({
      phone: ['', Validators.required],
      user_id: ['', Validators.required],
      speciality_id: ['', Validators.required]
    })

    this.idMedico = Number(data.idMedico);
    this.formularioDisponibilidad = this.form.group({
      day: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required]
    })
  }
  //Metodo que crea un nuevo medico
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

   //Metodo que crea un dia disponible
  CrearDisponibilidad(){
    //Validamos que el usuario ingrese los datos
    if(this.day == ''){
      this.toastr.error("Todos los campos son obligatorios","Error");
      return;
    }
    const newDisponibilidad: MedicalAvailability = {
      medic_id: this.idMedico,
      day: this.formularioDisponibilidad.value.day,
      start_time: this.formularioDisponibilidad.value.start_time,
      end_time: this.formularioDisponibilidad.value.end_time
    }
    this._service.NewDisponibilidadMedica(newDisponibilidad, this.idMedico ).subscribe({//Ejecutamos el servicio para agregar la especialidad
      next: (resp: any) => {
        this.toastr.success(`${newDisponibilidad.day} fue agregada a la base de datos.`, 'Disponibilidad registrada');
        this.dialogRef.close();
        location.reload();
      },
      error: (err) => {
        this.toastr.error('Error al crear disponibilidad');
        console.error(err);
      }
     }); 
  }

  //Metodo que crea una especialidad
  CrearEspecialidad(){
    //Validamos que el usuario ingrese los datos
    if(this.name == ''){
      this.toastr.error("Todos los campos son obligatorios","Error");
      return;
    }
    const newSpeciality: Speciality = {
      name: this.formularioEspecialidad.value.name
    }
    this._service.NewEspecialidad(newSpeciality).subscribe(() => {
      this.toastr.success(`${newSpeciality.name} fue agregada a la base de datos`, 'Especialidad registrada')
      location.reload();
    })
  }

  //Metodo por el cual cerramos la ventana emergente
  cerrarVentana(){
    this.dialogRef.close();
  }
}
