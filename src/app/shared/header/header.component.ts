import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario;
  public admin = "ADMINISTRADOR";
  constructor(private usuarioService: UsuarioService,
              private router: Router,) {
              this.usuario = usuarioService.usuario
              }

  ngOnInit(): void {
  this.menu()
  }
  logout() {
    this.usuarioService.logout();
  }
  menu(){
  const adminRole= this.usuario.role
    if (adminRole !== 'ADMIN_ROLE'){
       this.admin = ""
    }
  }
}
