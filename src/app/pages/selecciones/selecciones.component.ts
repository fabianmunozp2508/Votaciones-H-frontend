import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { SubirfotosService } from 'src/app/services/subirfotos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import {Image} from '../../models/imagen.models'
@Component({
  selector: 'app-selecciones',
  templateUrl: './selecciones.component.html',
  styleUrls: ['./selecciones.component.css']
})
export class SeleccionesComponent implements OnInit {

  @Input() image: string

  public usuario: Usuario;
  public cargando: boolean = true;
  public cantidadPost: boolean = true;
  public solo2: boolean = true;
  public Image2: Image[] = [];
  public Image3: Image[] = [];

  constructor(private usuarioService: UsuarioService,
              private fotoServices: SubirfotosService,
              private router: Router ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

  }

  ImagenesUserId(uid: string) {
    this.cargando = true;
    this.cantidadPost = true;
         this.fotoServices.cargarpostById(uid )
         .subscribe( (Image: Image[]) => {
        this.cargando = false;
        this.Image3 = Image;

      });
  }
  ImagenesUser() {
    this.cargando = true;
    this.cantidadPost = true;
         this.fotoServices.cargarpostId( )
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
