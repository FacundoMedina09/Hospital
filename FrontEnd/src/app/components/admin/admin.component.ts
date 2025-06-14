import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Services } from '../../services/services';
import { Speciality } from '../../interfaces/speciality.interfaces';
import { AdminAddComponent } from '../admin-add/admin-add.component';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '../../interfaces/patient.interfaces';
import { User } from '../../interfaces/user.interfaces';
import { Medic } from '../../interfaces/medic.interfaces';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  nuestraRuta: string = '';
  listaEspecialidades: Speciality[] = [];
  listaUsuariosPacientes: any[] = [];
  listaUsuariosMedicos: any [] = [];
  listaUsersRolMedic: User [] = [];


  constructor(private router: Router,
    private _services: Services,
    public dialog: MatDialog)
  {
    this.nuestraRuta = this.router.url;
  }

  ngOnInit(){
    this.VerEspecialidades();
    this.VerMedicosUsuarios();
    this.VerPacientesUsuarios();

  }


  //Mostramos los pacientes usuarios que hay en la db
  VerPacientesUsuarios(){ 
    this._services.VerPacientesyUsuarios().subscribe({
      next: (data: any) => {
        for (const user of data.users || []){
          const paciente = (data.patients as Patient[]).find(p => p.user_id === user.id);
          if (paciente) {
            this.listaUsuariosPacientes.push({
              user_id: user.id,
              name: user.name,
              surname: user.surname,
              email: user.email,
              dni: paciente.dni,
              phone: paciente.phone,
              direction: paciente.direction,
              patient_id: paciente.id
            });
          }
        }
        this.listaUsuariosPacientes = this.listaUsuariosPacientes;
      },
      error: (error) => {
        console.error('Error al cargar pacientes y usuarios', error);
      }
    }); 
  }

  //Mostramos los medicos usuarios que hay en la db
  VerMedicosUsuarios(){ 
    this._services.VerMedicosyUsuarios().subscribe({
      next: (data: any) => {
        for (const user of data.users || []){
          const medico = (data.medics as Medic[]).find(p => p.user_id === user.id);
          if (medico) {
            this.listaUsuariosMedicos.push({
              user_id: user.id,
              name: user.name,
              surname: user.surname,
              email: user.email,
              phone: medico.phone,
              speciality_id: medico.speciality_id,
              medic_id: medico.id
            });
          }
        }
        this.listaUsuariosMedicos = this.listaUsuariosMedicos;
        this.listaUsersRolMedic = data.users.filter((user: any) => {
          return !this.listaUsuariosMedicos.some(m => m.user_id === user.id);
        });
      },
      error: (error) => {
        console.error('Error al cargar pacientes y usuarios', error);
      }
    }); 
  }
  
  //Mostrar las especialidades que hay en la db
  VerEspecialidades(){
    this._services.VerEspecialidades().subscribe((data)=>{
      if(Array.isArray(data)){
        this.listaEspecialidades = data; //Si es un arreglo se asigna
      }
      else{
        this.listaEspecialidades = [data]; //Si no es un arreglo, lo convierte
      }
    })
  }

  getNombreEspecialidad(id: number): string {
    const especialidad = this.listaEspecialidades.find(e => e.id === id);
    return especialidad ? especialidad.name : 'Especialidad no encontrada';
  }

  //Agregar especialidad/medico a la db
    Agregar(){
    // Una vez iniciado vamos a agregar un cliente
    const dialogRef = this.dialog.open(AdminAddComponent,{
    disableClose: true, // Al hacer click fuera de la ventana, esta no se cierra
    autoFocus: true, //Foco del cursor en la ventana
    closeOnNavigation: false, //Que la ventana no se cierre al tocar algun boton del navegador
    width: '50%',
    height: '55%',
    data:{
      tipo: 'CREAR' ,
      listaUsersRolMedic: this.listaUsersRolMedic,
      listaEspecialidades: this.listaEspecialidades
    }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
