import { Component } from '@angular/core';
import { CARRUSEL_DATA_ITEMS } from '../../constantes/carrusel.constantes';
import { Carrusel } from '../../interfaces/carrusel.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../../services/services';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../../interfaces/patient.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  public carruselData: Carrusel[] = CARRUSEL_DATA_ITEMS;
  rutaActual: string = '';
  idUsuario: string = '';
  idPaciente: string = '';
  formulario: FormGroup; //Creamos el formulario

  constructor(private form: FormBuilder ,private router: Router, private arouter: ActivatedRoute, private _service: Services, private toastr: ToastrService){
    this.rutaActual = this.router.url;
    this.arouter.params.subscribe(params => {
      this.idUsuario = params['id'];
    });

    this.formulario = this.form.group({ //Instanciamos el formulario
      dni: ['', Validators.required],
      phone: ['', Validators.required],
      direccion: ['', Validators.required],
      date_birt: ['', Validators.required],
    })

  }

  ngOnInit(){
    if(this.idUsuario) {
      this.VerIdPaciente();
    }
    
  }

  //Metodo por el cual creamos un paciente
  CrearPaciente(){
    const nuevoPaciente = {
      user_id: Number(this.idUsuario),
      dni: this.formulario.value.dni,
      phone: this.formulario.value.phone,
      direction: this.formulario.value.direccion,
      date_birt: this.formulario.value.date_birt
    }
    this._service.NewPaciente(nuevoPaciente, Number(this.idUsuario)).subscribe({
      next: (resp: any) => {
      this.toastr.success('Datos completados correctamente');
      window.location.reload();
    },
    error: (err) => {
      this.toastr.error('Error al completar datos');
    }
    })
  }

  VerIdPaciente(){
    this._service.VerPaciente(Number(this.idUsuario)).subscribe({
    next: (resp: any) => {
      this.idPaciente = String(resp.patient.user_id);
    },
    error: (err) => {
      this.idPaciente = '';
    }
    })
  }

  NewPaciente(){
    
  }


}
