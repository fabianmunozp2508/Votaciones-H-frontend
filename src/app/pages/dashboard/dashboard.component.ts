import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { SubirfotosService } from '../../services/subirfotos.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import {Image} from '../../models/imagen.models'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  myDate = new Date();
  public votaciones :boolean = false;
  public publicar:Image
  public usuario: Usuario;
  public cargando: boolean = true;
  public cantidadPost: boolean = true;
  public solo2: boolean = true;
  public archivos: any = [];
  public Image2: Image[] = [];
  public votoForm: FormGroup;
  public usuarioseleccionado : Usuario
  public publicado :boolean;
  constructor(private usuarioService: UsuarioService,
              private fotoServices: SubirfotosService,
              private fb: FormBuilder,
              private router: Router ) {
  this.usuario = usuarioService.usuario;

}
  ngOnInit(): void {
    this.votoForm = this.fb.group({
      voto: true,
      publicado:true,
      uid:this.usuario.uid
    });
    this.ImagenesUser();
    this.anularvoton();

  }


ImagenesUser() {
    this.cargando = true;
    this.cantidadPost = true;
         this.fotoServices.cargarImagenes()
         .subscribe( (Image: Image[]) => {
             let data = Object.values(Image);
             for(let i = 0 ; i < data.length ; i++){
              const publicar = data[i].publicado;
              if ( publicar === true){
                this.publicado = true
                console.log('puedes publicar' + data)
              }else{
                this.publicado = false
                console.log('No puedes publicar')
              }
              this.Image2 = Image;
            }
     });
  }

  like(_id: string) {
    this.fotoServices.like(_id)
    .subscribe( resp => {
      Swal.fire('Like');
    })
  }
    vote(_id: string) {
    const voto = this.usuario.voto
    this.fotoServices.cargarvotes(_id)
    .subscribe( resp => {
      if(voto == true){
        Swal.fire({
          icon: 'success',
          title: 'Gracias por su vote',
          showConfirmButton: false,

        })
      }else{
        Swal.fire({
          title: 'Usted ya ha votado',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }
    })
    }

votar( usuario:Usuario ) {
  this.usuarioService.cargarVoto( usuario )
    .subscribe( resp => {
      console.log(resp);
    })
}

anularvoton(){
  const boton = this.usuario.voto
   if (boton == true){
     this.votaciones = true;

   }
}
votacion(uid: string) {
    this.usuarioService.VotarNulo(uid )
      .subscribe( resp => {
        this.ImagenesUser();
        Swal.fire(
          'Fotografia Votada',
          ` Votaste Exitosamente`,
          'success'
        );
        this.router.navigateByUrl(`/dashboard`)
      });
  }
}



