import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [

  { path: '**', redirectTo: 'Hospital' }, // Ruta comodín para manejar errores
  { path: 'Hospital', component: DashboardComponent }, // Ruta principal
  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}