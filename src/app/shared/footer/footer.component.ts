import { Component, OnInit } from '@angular/core';
import { MyInfoService } from "../../services/myInfo.service";
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  anio: number = new Date().getFullYear();

  constructor(public _servicio: MyInfoService) { }

  ngOnInit(): void {
  }

}
