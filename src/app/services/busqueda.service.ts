import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import {Usuario} from '../models/usuario.models';
import {Image} from '../models/imagen.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

constructor(private http: HttpClient) { }

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

private transformarImagenes( resultados: any[]): Image[] {
  return resultados;
}

buscarResultados(
  tipo: 'imagenes',
  termino: string
) {

const url = `${ base_url }/buscar/coleccion/${ tipo }/${ termino }`;
return this.http.get<any[]>( url, this.headers )
        .pipe(
          map( (resp: any ) => {
            switch ( tipo ) {
              case 'imagenes':
                return this.transformarImagenes( resp.resultados );
              default:
                return [];
            }

          })
        );
}
}
