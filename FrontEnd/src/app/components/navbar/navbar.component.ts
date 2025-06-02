import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentRoute: string = '';
  menuAbierto: boolean = false;
  constructor(private router: Router){

  }

  ngOnInit(): void{
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  Mostrarlista(queListaEs: string) {
    const lista = document.getElementsByClassName(queListaEs)[0] as HTMLElement | undefined;
    if (!lista) {
      console.warn(`No existe elemento con clase ${queListaEs}`);
      return;
    }
    // Verificamos si está oculto (display 'none') o visible (cualquier otro valor)
    const estaVisible = lista.style.display !== 'none' && lista.style.display !== '';
    if (!estaVisible) {
      lista.style.display = 'block'; // o 'flex', según necesites
      lista.style.visibility = 'visible';
      lista.style.opacity = '1';
    } else {
      lista.style.display = 'none';
      lista.style.visibility = 'hidden';
      lista.style.opacity = '0';
    }
  }
  toggleMenu() {
    const contenedorMenu = document.querySelector('.Contenedor-Navbar-Manu') as HTMLElement;
    if (contenedorMenu) {
      this.menuAbierto = !this.menuAbierto;
      if (this.menuAbierto) {
        contenedorMenu.classList.add('activo');
      } else {
        contenedorMenu.classList.remove('activo');
      }
    }
  }

}
