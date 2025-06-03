import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [

  //Rutas del Hospital
  { path: 'Hospital', component: DashboardComponent }, // Ruta principal
  { path: 'Hospital/PreguntasFrecuentes',component: DashboardComponent },
  { path: 'Hospital/Especialidades', component: DashboardComponent },

  //Rutas de Login
  { path: 'Hospital/Login/Paciente',component: LoginComponent},
  { path: 'Hospital/Login/Medico',component: LoginComponent},
  { path: 'Hospital/Login/Admin',component: LoginComponent},

  //Rutas de usuarios
  {path: 'Hospital/Home/Paciente/:id', component: HomeComponent},
  {path: 'Hospital/Home/Medico/:id', component: HomeComponent},
  {path: 'Hospital/Home/Admin/:id', component: HomeComponent},


  { path: '**', redirectTo: 'Hospital' }, // Ruta comodín para manejar errores
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}