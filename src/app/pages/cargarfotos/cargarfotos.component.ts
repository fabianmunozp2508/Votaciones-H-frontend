import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import {Image} from '../../models/imagen.models';
import { SubirfotosService } from 'src/app/services/subirfotos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargarfotos',
  templateUrl: './cargarfotos.component.html',
  styleUrls: ['./cargarfotos.component.css']
})
export class CargarfotosComponent implements OnInit {

  public usuario: Usuario;
  public ImagenForm: FormGroup;
  public previsualizacion: string;
  public cantidadPost: boolean = true;
  public cargando: boolean = true;
  public archivos: any = [];
  public loading: boolean
  public Image2: Image[] = [];
  constructor(private usuarioService: UsuarioService,
              private fb: FormBuilder,
              private fotoServices: SubirfotosService,
              private sanitizer: DomSanitizer,
              private router: Router,) {
              this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.ImagenForm = this.fb.group({
      title: ['', Validators.required,Validators.maxLength(50)],
      description:['', Validators.required,Validators.maxLength(258) ],
      filename:['', Validators.required ] ,
      usuario:[this.usuario.uid]
    });
    this.ImagenesUser()
  }
  capturarFile(event){
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
          })
    this.archivos.push(archivoCapturado)
  }
   extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
  }

  subirArchivo(): any {
    const title =   this.ImagenForm.value.title
    const description =  this.ImagenForm.value.description
    const user = this.usuario.uid
    try {
      this.loading = true;
      const formularioDeDatos = new FormData();
      console.log(formularioDeDatos)
      this.archivos.forEach((archivo) => {
        formularioDeDatos.append('image', archivo),
        formularioDeDatos.append("title", title),
        formularioDeDatos.append("description", description)

      })
      this.ImagenForm.markAllAsTouched();
      this.fotoServices.post(formularioDeDatos)
      .subscribe((resp:any)=>{
        Swal.fire('Creado', `${ title } creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/aboutme`)
      })
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
  }
  ImagenesUser() {
    this.cargando = true;
    this.cantidadPost = true;
         this.fotoServices.cargarpostId()
         .subscribe( (Image: Image[]) => {
          if (Image.length==0){
            this.cantidadPost = false;
          }else if (Image.length>=2){
            Swal.fire({
              title: 'Invalido',
              text: `Usted a cargado su limite maximo`,
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Regresar'
            })
            this.router.navigateByUrl(`/dashboard/aboutme`)
          }
        this.cargando = false;
        this.Image2 = Image;
        console.log(Image)
      })

  }
}
