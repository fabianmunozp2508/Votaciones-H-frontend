import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule} from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { CargarfotosComponent } from './cargarfotos/cargarfotos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeleccionesComponent } from './selecciones/selecciones.component';
import { AdministracionComponent } from './administracion/administracion.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ContactComponent,   
    AboutmeComponent,
    CargarfotosComponent,
    SeleccionesComponent,
    AdministracionComponent    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    DashboardComponent,
    PagesComponent

  ]
})
export class PagesModule { }
