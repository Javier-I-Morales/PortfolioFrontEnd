import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {

  constructor() { }

  show = {'transition': 0+'s','opacity': 0, 'color': '#fffffff'};
  estado = false;
  modificaShow(estado : boolean){

    if(estado){
      this.show = {'transition': 5+'s', 'opacity': 1, 'color': '#000000'};
    }else{
      this.show = {'transition': 0+'s','opacity': 0, 'color': '#fffffff'};
    }
    return this.show;
  }

  ngOnInit(): void {
  }

}
