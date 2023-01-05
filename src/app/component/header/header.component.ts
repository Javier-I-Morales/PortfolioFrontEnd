import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticauserService } from 'src/app/service/autenticauser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //in = sessionStorage.getItem('estado') ==="1"? true:false;
  estadologueado : boolean;

  constructor(private ruta:Router, private autentiservice : AutenticauserService ) { 
    this.estadologueado = false;
  }
  // isCollapse = true;   // guardamos el valor
  // toggleState() { // manejador del evento
  //     let foo = this.isCollapse;
  //     this.isCollapse = foo === false ? true : false; 
  // }
  linkargprog:string = "https://www.argentina.gob.ar/economia/conocimiento/argentina-programa";
  logoArg = '/assets/images/header/logoArgProg.jpg';
  logoGit = '/assets/images/header/logoGit.jpg';
  logoLinkedIn = '/assets/images/header/logoLink.jpg';
  
  ngOnInit(): void {
    this.autentiservice.conocerEstadoSesion().subscribe(estado =>{
      this.estadologueado = estado;
    });
  }

  login(){
    this.ruta.navigate(['/iniciar-sesion']);
  }
  logout(){
    this.autentiservice.CerrarSesion();
    sessionStorage.setItem('estado',"0");
    this.ruta.navigate(['/portfolio']);
  }

}
