import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hardsoftkills',
  templateUrl: './hardsoftkills.component.html',
  styleUrls: ['./hardsoftkills.component.css']
})
export class HardsoftkillsComponent implements OnInit {

  constructor() { }

  EstilosCabecera = {'background-color': '#000000', 'height': 50 +'px', 'color': '#FFFFFF'};
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
      this.EstilosCabecera = {'background-color': '#FFFFFF', 'height': 150+'px', 'color': '#000000'};
      setTimeout(() => {
        this.EstilosCuerpo = {'color': '#000000', 'display':'block'};
      },1000);
    }else
    {
      this.EstilosCuerpo = {'color': '#fffffff', 'display':'none'};
      this.EstilosCabecera = {'background-color': '#000000', 'height': 50+'px', 'color': '#FFFFFF'};
    }
  }

  ngOnInit(): void {
  }

}
