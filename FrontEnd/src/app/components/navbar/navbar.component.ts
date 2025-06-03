import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators'
import { RegisterComponent } from '../register/register.component';
import { Services } from '../../services/services';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentRoute: string = '';
  menuAbierto: boolean = false;

  constructor(private router: Router,
    private _services: Services,
    private aRouter: ActivatedRoute,
    public dialog: MatDialog
  ){

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

  //Registrar Nuevo Usuario
  RegistrarUsuario(){
    const dialogRef = this.dialog.open(RegisterComponent,{
      disableClose: true, // Al hacer click fuera de la ventana, esta no se cierra
      autoFocus: true, //Foco del cursor en la ventana
      closeOnNavigation: false, //Que la ventana no se cierre al tocar algun boton del navegador
      width: '50%',
      height: '80%',
      data:{
        tipo: 'CREAR' ,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  //Rutas a Login

  LoginPaciente(){
    this.router.navigate(['/Hospital/Login/Paciente']);
  }

  LoginMedico(){
    this.router.navigate(['/Hospital/Login/Medico']);
  }

  LoginAdmin(){
    this.router.navigate(['/Hospital/Login/Admin']);
  }

}
