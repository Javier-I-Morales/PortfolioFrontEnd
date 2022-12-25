import { Component, OnInit } from '@angular/core';
import "jquery-knob";
declare var $: any;
@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  color(){
    
   $(".circle").knob({
     "min":0,
     "max":100,
     "width":"80%",
     "fgColor":'red',
     "readOnly ":true,
     "angleOffset":-125,
     "angleArc":250,
   });
   
   return {'background-color':'#FFFFFF'};
 }

}
