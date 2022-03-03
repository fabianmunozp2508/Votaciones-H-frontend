import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { SubirfotosService } from '../../services/subirfotos.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import {Image, Image2} from '../../models/imagen.models';
import { Subscription } from 'rxjs';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  myDate = new Date();

  public usuario: Usuario;
  public cargando: boolean = true;
  public cantidadPost: boolean = true;
  public solo2: boolean = true;
  public Image2: Image[] = [];
  public Image3: Image2[] = [];
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public imgSubs: Subscription;
  public desde: number = 0;
  public publicado :boolean = false;

  constructor(private usuarioService: UsuarioService,
              private fotoServices: SubirfotosService,
              private busquedaService: BusquedaService,
              private router: Router ) {
this.usuario = usuarioService.usuario;

}
  ngOnInit(): void {
    this.ImagenesUser();
    this.cargarUsuarios();
    this.anularfoto();
  }
  ImagenesUser() {
    this.cargando = true;
    this.cantidadPost = true;
         this.fotoServices.cargarImagenes()
         .subscribe( (Image: Image[]) => {
          if (Image.length== 0){

            this.cantidadPost = false;
          } else if (Image.length >=2 ){
            this.solo2 = false;
          }
          console.log(Image)
        this.cargando = false;
        this.Image2 = Image;
      });
  }
  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
    })
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;
    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscarUser( image: Image ) {
  this.fotoServices.cargarpostById(image._id)
      .subscribe( (Image: Image[]) => {
        console.log(Image)
         this.cargando = false;
         this.Image3 = Image;
        });
  }

  guardarCambios( image: Image ) {
    this.fotoServices.actualizarfoto( image._id, image.publicado )
     .subscribe( (Image: Image[]) => {
      Swal.fire({
        title: '¿Aprobar foto?',
        text: `Esta a punto de publicar la fotografia de  ${ image.usuario.nombre }`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, publicar'
      })
        this.cargando = false;
        this.Image3 = Image;
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

anularfoto(){
  const boton = this.usuario.publicado
   if (boton == true){
     this.publicado = true;
     console.log(boton)
   }
}
buscar( termino: string ) {
  if ( termino.length === 0 ) {
    return this.ImagenesUser();
  }
  this.busquedaService.buscarResultados( 'imagenes', termino )
      .subscribe( resp => {
        this.Image2 = resp;
      });
}

publicar(uid: string) {
  this.usuarioService.publicarFoto(uid )
    .subscribe( resp => {
      this.ImagenesUser();
      Swal.fire(
        'Fotografia publicada',
        ` Votaste Exitosamente`,
        'success'
      );
      this.router.navigateByUrl(`/dashboard`)
    });
}
}

