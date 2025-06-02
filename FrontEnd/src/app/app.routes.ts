import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [

  
  { path: 'Hospital', component: DashboardComponent }, // Ruta principal
  { path: 'Hospital/PreguntasFrecuentes',component: DashboardComponent },
  { path: 'Hospital/Especialidades', component: DashboardComponent },
  { path: '**', redirectTo: 'Hospital' }, // Ruta comodín para manejar errores
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}