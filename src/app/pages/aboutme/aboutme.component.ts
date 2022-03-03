import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { SubirfotosService } from 'src/app/services/subirfotos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import {Image} from '../../models/imagen.models'
@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {
  public usuario: Usuario;
  public cargando: boolean = true;
  public cantidadPost: boolean = true;
  public solo2: boolean = true;
  public Image2: Image[] = [];

  constructor(private usuarioService: UsuarioService,
              private fotoServices: SubirfotosService,
              private router: Router ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.ImagenesUser();

  }

  ImagenesUser() {
    this.cargando = true;
    this.cantidadPost = true;
         this.fotoServices.cargarpostId()
         .subscribe( (Image: Image[]) => {
          if (Image.length== 0){
            this.cantidadPost = false;
          } else if (Image.length>=2){
            this.solo2 = false;
          }
        this.cargando = false;
        this.Image2 = Image;

      });
  }

  borrarFoto(uid: string) {
    Swal.fire({
    title: '¿Borrar Foto?',
    text: `Esta a punto de borrar a ${ uid }`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, borrarlo'
  }).then((result) => {
    if (result.value) {
      this.fotoServices.borrarfoto(uid )
        .subscribe( resp => {
          this.ImagenesUser();
          Swal.fire(
            'Fotografia Borrada',
            ` fue eliminado correctamente`,
            'success'
          );
          this.router.navigateByUrl(`/dashboard/aboutme`)
        });
    }
  })
}

}
