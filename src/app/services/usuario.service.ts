import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {tap, map, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { Usuario } from '../models/usuario.models';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login.interfaces';


const base_url = environment.base_url;
const base_urlF =environment.base_urlFace
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;
constructor(
            private http:HttpClient,
            private router: Router,
            private ngZone: NgZone,

) { }

get token(): string {
  return localStorage.getItem('token') || '';
}
get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
  return this.usuario.role;
}
get voto(): Boolean {
  return this.usuario.voto;
}
get publicado(): Boolean {
  return true;
}
get uid():string {
  return this.usuario.uid || '';
}

get img():string {
  return this.usuario.img;
}
get headers(){
  return {
  headers:{
    'x-token' : this.token
  }}
}
public put(body){
  const url = `${ base_url }/usuarios/voto/`;
  return this.http.put(url,body,this.headers)
}
guardarLocalStorage( token: string, menu: any ) {
  localStorage.setItem('token', token );
  localStorage.setItem('menu', JSON.stringify(menu) );
}
logout() {
  localStorage.removeItem('token');
  this.auth2.signOut().then(() => {
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    })
  });
}

crearUsuario( formData: RegisterForm ) {
  return this.http.post(`${ base_url }/usuarios`, formData )
         .pipe(
           tap( (resp: any) => {
             this.guardarLocalStorage( resp.token, resp.menu );
           })
         )
}
login( formData: LoginForm ) {
  return this.http.post(`${ base_url }/login`, formData )
         .pipe(
           tap( (resp: any) => {
             this.guardarLocalStorage( resp.token, resp.menu );
           })
         );
}
eliminarUsuario( usuario: Usuario ) {
  const url = `${ base_url }/usuarios/${ usuario.uid }`;
  return this.http.delete( url, this.headers );
}
guardarUsuario( usuario: Usuario ) {
return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );
}

actualizarcita(uid: string ) {
  const url = `${ base_url }/pacientes/citasVirtual/${ uid }`;
  return this.http.put( url, { uid }, this.headers );
}

actualizarPerfil( data: Usuario  ) {
console.log(data.voto)
const datos= this.http.patch(`${ base_url }/usuarios/voto`, data, this.headers );
return datos;
}

actualizarVoto( _id: string) {
  const url = `${ base_url }/usuarios/voto/${ _id }`;
  return this.http.put(url,{ _id  },this.headers)
}


cargarUsuarios( desde: number = 0 ) {
  const url = `${ base_url }/usuarios?desde=${ desde }`;
  return this.http.get<CargarUsuario>( url, this.headers )
          .pipe(
            map( resp => {
              const usuarios = resp.usuarios.map(
                user => new Usuario(user.nombre,user.email,'',user.img,user.voto,user.publicado,user.role,user.facebook_id,user.provider_id,user.google,user.uid )
              );
              return {
                total: resp.total,
                usuarios
              };
            })
          )
}

validarToken(): Observable<boolean> {
  return this.http.get(`${ base_url}/login/renew`, {
    headers:{
      'x-token': this.token,
    }
  }).pipe(
    map(( resp : any)=>{
      const { nombre,email,img,voto,publicado,role,facebook_id,provider_id,google,uid } = resp.usuario;
        this.usuario = new Usuario(nombre,email,'',img,voto,publicado,role,facebook_id,provider_id,google,uid );

      this.guardarLocalStorage( resp.token, resp.menu );
      return true;
    }),
     );
}

cargarVoto( usuario: Usuario ) {
    return this.http.put(`${ base_url }/usuarios/voto`, usuario, this.headers );

  }
  VotarNulo( uid) {
    const url = `${ base_url }/usuarios/voto/${ uid }`;
    return this.http.patch( url, this.headers );
  }
  publicarFoto( uid) {
    const url = `${ base_url }/social/imagenes/usuario/publicar/${ uid }`;
    return this.http.patch( url, this.headers );
  }
  loginFacebook( ) {
    const url = `http://localhost:8080/vph/auth/facebook/token`;
    return this.http.get(url,this.headers);

  }
  googleInit() {

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '596517242485-pro1tcm1ok3g7s7865k47qg90757gs78.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }
  loginGoogle( token ) {
    return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    this.guardarLocalStorage( resp.token, resp.menu );
                  })
                );
  }

}






