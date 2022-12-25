import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  constructor() {
    this.modificaEstado();
   }
  EstilosCabecera = {'background-color': '#000000', 'height':'auto', 'color': '#FFFFFF'};
  EstilosCuerpo = {'color': '#FFFFFF', 'display':'none'};

  estado:boolean = false;
  
  modificaEstado(){
    if(this.estado == false){
      this.estado = true;
    }else{
      this.estado = false;
    }
    this.modificaEstilos();
  }


  modificaEstilos(){
    if(this.estado){
      this.EstilosCabecera = {'background-color': '#FFFFFF', 'height': 'auto', 'color': '#000000'};
      setTimeout(() => {
        this.EstilosCuerpo = {'color': '#000000', 'display':'block'};
      },1000);
    }else
    {
      this.EstilosCabecera = {'background-color': '#000000', 'height': 'auto', 'color': '#FFFFFF'};
      this.EstilosCuerpo = {'color': '#fffffff', 'display':'none'};
    }
  }

  ngOnInit(): void {
  }

}
