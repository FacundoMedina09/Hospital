import { NgModule } from "@angular/core";
import {  RouterModule ,Routes } from '@angular/router';

//Componentes
import { AppRoutingModule } from "./app.routes";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CarruselComponent } from "./components/carrusel/carrusel.component";
import { FooterComponent } from "./components/footer/footer.component";



@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        NavbarComponent,
        CarruselComponent,
        FooterComponent
        
    ],
    imports: [
        BrowserModule,  
        CommonModule,
        RouterModule,
        AppRoutingModule,
        
    ],
    bootstrap: [AppComponent],
    providers:[
        provideHttpClient(withInterceptorsFromDi())
    ],
    
})

export class AppModule{}