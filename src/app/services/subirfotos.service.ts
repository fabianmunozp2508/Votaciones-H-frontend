import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.models';
import {Image} from '../models/imagen.models'
import { Router } from '@angular/router';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class SubirfotosService {
  public fotos:any = [];
  public previsualizacion!: string;
  public usuario: Usuario;
  public image : Image
constructor(private http:HttpClient,
            private router: Router,
            private ngZone: NgZone,) { }

get token(): string {
  return localStorage.getItem('token') || '';
}
get headers() {
  return {
    headers: {
      'x-token': this.token
    }
  }
}
get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
  return this.usuario.role;
}
get uid():string {
  return this.usuario.uid || '';
}
get publicado():boolean {
  return this.usuario.publicado;
}
// Cargar imagenes montadas por los usuarios
cargarImagenes(){
  const url = `${ base_url }/social`
  return this.http.get( url, this.headers )
                  .pipe(
                   map( (resp:
                  {ok: boolean, image: Image[] }) => resp.image )
                  );
}
public post(body){
  const url = `${ base_url }/social/imagenes`;
  return this.http.post(url,body,this.headers)
}
subirpost(image: Image){
  const url = `${ base_url }/social`;
  return this.http.post( url, image, this.headers );
}
cargarpostId() {
  const url = `${ base_url }/social/imagenes/usuario/`;
  return this.http.get( url, this.headers )
                  .pipe(
                   map( (resp:
                  {ok: boolean, image: Image[] }) => resp.image )
                  );
}

borrarfoto( uid) {
  const url = `${ base_url }/social/imagenes/${ uid }`;
  return this.http.delete( url, this.headers );
}


actualizarfoto(_id: string, publicado: boolean ) {
  const url = `${base_url}/social/imagenes/usuario${ _id }`;
  return this.http.put(url, { publicado }, this.headers );
}
cargarpostById(uid : string) {
  const url = `${ base_url }/social/imagenes/usuario/${ uid }`;
  return this.http.get( url, this.headers )
                  .pipe(
                   map( (resp:
                  {ok: boolean, image }) => resp.image )
                  );
}

like(uid: string){
  const url = `${ base_url }/social/imagenes/like/${ uid }`;
  return this.http.post( url,{uid}, this.headers );

}
cargarvotes(uid: string){
  const url = `${ base_url }/social/imagenes/usuario/voto/${ uid }`;
  return this.http.post( url,{uid},this.headers );
}

Publicado( uid) {
  const url = `${ base_url }/social/imagenes/usuario/publicar/${ uid }`;
  return this.http.patch( url, this.headers );
}
}
