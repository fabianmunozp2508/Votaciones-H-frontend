import { Component, NgZone, OnInit } from '@angular/core';
import { MyInfoService } from "../../services/myInfo.service";
import {Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;
  anio: number = new Date().getFullYear();
  url ="http://localhost:8080/vph/login/facebook"

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });
  constructor( public _servicio: MyInfoService,
               private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone) {
  }
  ngOnInit(): void {
  }
  login() {
    this.formSubmitted = true;
    if ( this.loginForm.invalid ) {
      return;
    }
    // Realizar el posteo
    this.usuarioService.login( this.loginForm.value )
        .subscribe( resp => {
          // Navegar al Dashboard
          this.router.navigateByUrl('dashboard/aboutme');
        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error' );
        });
  }
  loginF(){
  this.usuarioService.loginFacebook()
}

  }




