import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyInfo } from "../interfaces/myInfo";
@Injectable({
  providedIn: 'root'
})
export class MyInfoService {
  data : MyInfo= {};
  cargada = false;
constructor(private http: HttpClient) {
  this.http.get('assets/data/data-pagina.json')
        .subscribe( (resp: MyInfo) => {
          this.cargada = true;
          this.data = resp;
          
        });


  }
 }


