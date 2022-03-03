import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  sidebarBarra = true
  url='http://localhost/dashboard'
  constructor(private router: Router,
              @Inject(DOCUMENT) document: any) {
              console.log(document.location.href)
              }

  ngOnInit(): void {
 this.cargarsidebar()
  }
 cargarsidebar(){
   if (document.location.href===this.url){
      this.sidebarBarra=false;
      console.log(document.location.href);
   }
 }
}
