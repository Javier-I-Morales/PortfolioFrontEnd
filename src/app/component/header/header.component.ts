import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  // isCollapse = true;   // guardamos el valor
  // toggleState() { // manejador del evento
  //     let foo = this.isCollapse;
  //     this.isCollapse = foo === false ? true : false; 
  // }

  logoArg = '/assets/logoArgProg.jpg';
  logoGit = '/assets/logoGit.jpg';
  logoLinkedIn = '/assets/logoLink.jpg';
  ngOnInit(): void {
  }

}
