import { Component } from '@angular/core';

import { Carrusel } from '../../interfaces/carrusel.interfaces';
import { CARRUSEL_DATA_ITEMS } from '../../constantes/carrusel.constantes'; 
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public carruselData: Carrusel[] = CARRUSEL_DATA_ITEMS;

  rutaActual: string = '';
  
  constructor(private router: Router, private route: ActivatedRoute){
    this.rutaActual = this.router.url;
  }


}
