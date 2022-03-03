import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/models/imagen.models';

@Component({
  selector: 'app-selector-foto',
  templateUrl: './selector-foto.component.html',
  styleUrls: ['./selector-foto.component.css']
})
export class SelectorFotoComponent implements OnInit {


  @Input() imagen = {
    title: "Demostracion",
    filename: "sasdasd.jpg",
    description: "Descripcion",
    usuarioNombre: "Fabian Muñoz Puello",
    usuarioCorre: "fabianmunozpuello@gmail.com",
}

  constructor() { }

  ngOnInit(): void {
 this.muestra()
  }
  muestra(){
    console.log(this.imagen)
  }
}
