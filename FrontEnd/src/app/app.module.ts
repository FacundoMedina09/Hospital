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
import { RegisterComponent } from "./components/register/register.component";
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        NavbarComponent,
        CarruselComponent,
        FooterComponent,
        RegisterComponent
        
    ],
    imports: [
        BrowserModule,  
        CommonModule,
        RouterModule,
        AppRoutingModule,
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            progressBar: true,
            progressAnimation: 'increasing',
            easeTime: 300
        })
                    
    ],
    bootstrap: [AppComponent],
    providers:[
        provideHttpClient(withInterceptorsFromDi())
    ],
    
})

export class AppModule{}