import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent implements OnInit {
  year = new Date().getFullYear();
  constructor(public router: Router,) { }

  ngOnInit(): void {
    this.home()
  }
 home(){
  setTimeout(()=>{
    console.log('Hola tiempo')
    this.router.navigateByUrl('dashboard/aboutme');
  },4000);
 }
}
