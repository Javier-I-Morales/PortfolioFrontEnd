import { Component, OnInit } from '@angular/core';
import { HardSoftSkillsModel } from 'src/app/models/HasdSoftSkillsModel';
import { HardsoftskillsService } from 'src/app/service/hardsoftskills.service';
import "jquery-knob";
import { AutenticauserService } from 'src/app/service/autenticauser.service';

declare var $: any;

@Component({
  selector: 'app-hardsoftkillscontent',
  templateUrl: './hardsoftkillscontent.component.html',
  styleUrls: ['./hardsoftkillscontent.component.css']
})
export class HardsoftkillscontentComponent implements OnInit {

  porcenvalue = "";
  skills: HardSoftSkillsModel[]=[];
  estadologueado : boolean;

  constructor(private servicio:HardsoftskillsService, private autentiservice:AutenticauserService) {
    this.estadologueado = false;
    
  }

  numer: string = "";
  puedeCambiar:boolean = true;

  ngOnInit(): void {
    this.autentiservice.conocerEstadoSesion().subscribe(estado =>{
      this.estadologueado = estado;
      if(!this.estadologueado){
        this.desactivarEdicion();
      }
    });

    this.servicio.getHardsoftskills().subscribe((resp:HardSoftSkillsModel[])=>{
      this.skills = resp;
    });
  }

  color(porcen: number, index:number){
    let indice = index.toString();
    this.porcenvalue = porcen.toString();
    $(".circle").knob({
      "min":0,
      "max":100,
      "width":"80%",
      "fgColor":'red',
      // "readOnly ":true,
      "angleOffset":-125,
      "angleArc":250,
    });
    $('#circle'+indice).val(this.porcenvalue).trigger('change');
    return {'background-color':'#FFFFFF'};
  }

  desactivarEdicion(){
    for(var i = 0; i <=5;i++){
      $('#contenedorA'+i).css({'display':'block'});
      $('#contenedorB'+i).css({'display':'none'});
    }
  }

  activarEdicion(indice:number){
    $('#contenedorA'+indice).css({'display':'none'});
    $('#contenedorB'+indice).css({'display':'block'});
  }

  guardarDatos(indice:number, skill: HardSoftSkillsModel){

    skill.nombre = $('#textoB'+indice).val();
    skill.porcentaje = $('#circleB'+indice).val();

    this.servicio.UpdateSkills(skill).subscribe(data =>{

      $('#contenedorA'+indice).css({'display':'none'});
      $('#contenedorB'+indice).css({'display':'block'});

      console.log("Datos guardados.")

      this.ngOnInit();
    });

  }


}
