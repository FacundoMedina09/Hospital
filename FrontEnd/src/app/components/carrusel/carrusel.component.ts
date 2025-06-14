import { Component, Input } from '@angular/core';
import { Carrusel } from '../../interfaces/carrusel.interfaces';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-carrusel',
  standalone: false,
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent {

  //Custom Properties
  @Input() height = 500;
  @Input() isFullScreen = false;
  @Input() items: Carrusel[] = [];

  //Final Properties
  public finalHeight: string | Number = 0;
  public currentPosition = 0;
  nuestraRuta: string = '';

  constructor(private router: Router){
    this.finalHeight = this.isFullScreen ? '100vh': `${this.height}px`;
  }

  ngOnInit(){
    this.items.map( (i,index) =>{
      i.id = index;
      i.marginLeft = 0;
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
      this.nuestraRuta = event.urlAfterRedirects;
    });
  }

  setCurrentPosition(position: number){
    this.currentPosition = position;
    const firstItem = this.items.find(i => i.id === 0);
    if (firstItem) {
      firstItem.marginLeft = -100 * position;
    }
  }

  setNext(){
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if(nextPosition < this.items.length){
      finalPercentage = - 100 * nextPosition;
    }
    else{
      nextPosition = 0;
    }
    const firstItem = this.items.find(i => i.id === 0);
    if (firstItem) {
      firstItem.marginLeft = finalPercentage;
      this.currentPosition = nextPosition;
    }
  }

  setBack(){
    let finalPercentage = 0;
    let backPosition = this.currentPosition - 1;
    if(backPosition >= 0){
      finalPercentage = - 100 * backPosition
    }
    else{
      backPosition = this.items.length - 1;
      finalPercentage = - 100 * backPosition;
    }
    const firstItem = this.items.find(i => i.id === 0);
    if (firstItem) {
      firstItem.marginLeft = finalPercentage;
      this.currentPosition = backPosition;
    }
  }

}
