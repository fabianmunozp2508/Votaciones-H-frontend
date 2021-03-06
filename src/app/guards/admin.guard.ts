import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.models';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService,
    private router: Router ) {}

canActivate(
next: ActivatedRouteSnapshot,
state: RouterStateSnapshot): boolean {
if (this.usuarioService.role === 'ADMIN_ROLE') {
  
return true;
} else {
  Swal.fire('No esta Autorizado a esta ruta');
this.router.navigateByUrl('/dashboard');
return false;
}}
}
