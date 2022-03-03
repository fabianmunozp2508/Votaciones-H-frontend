import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { CargarfotosComponent } from './cargarfotos/cargarfotos.component';
import {SeleccionesComponent} from './selecciones/selecciones.component';
import { AdminGuard } from '../guards/admin.guard';
import { AdministracionComponent } from './administracion/administracion.component';
 
const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Home' } },
  { path: 'contact', component: ContactComponent, data: { titulo: 'Contact' }},
  { path: 'cargarFotos', component: CargarfotosComponent, data: { titulo: 'Contact' }},  
  { path: 'aboutme', component: AboutmeComponent, data: { titulo: 'About me' }},
  {path:  'administracion', component: AdministracionComponent,canActivate: [ AdminGuard ],},
  { path: 'selecciones/:id', component: SeleccionesComponent, data: { titulo : 'Seleccion de Imagen'}}
]


@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
