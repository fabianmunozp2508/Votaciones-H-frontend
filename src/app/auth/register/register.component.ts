import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  url ="http://localhost:8080/vph/login/facebook"
  anio: number = new Date().getFullYear();

  public formSubmitted = false;
  public registerForm = this.fb.group({
    nombre: ['', Validators.required ],
    email: ['', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
  },{

  })
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }
  register(){
    this.formSubmitted = true;
    if ( this.registerForm.invalid ) {
      return;
    }
    // Realizar el posteo
    this.usuarioService.crearUsuario( this.registerForm.value )
        .subscribe( resp => {
          // Navegar al Dashboard
          this.router.navigateByUrl('/dashboard/aboutme');
        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error' );
        });

  }



}
