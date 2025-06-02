import { Component } from '@angular/core';

import { Carrusel } from '../../interfaces/carrusel.interfaces';
import { CARRUSEL_DATA_ITEMS } from '../../constantes/carrusel.constantes'; 


@Component({
  selector: 'app-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public carruselData: Carrusel[] = CARRUSEL_DATA_ITEMS;
}
