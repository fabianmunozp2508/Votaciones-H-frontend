import {NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagesModule } from '../pages/pages.module';
import { SelectorFotoComponent } from './selector-foto/selector-foto.component';

@NgModule({
  declarations:[
    LoginComponent,
    RegisterComponent,
    
    SelectorFotoComponent

  ],
  exports: [LoginComponent,
            RegisterComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule


  ]
})
export class AuthModule { }
