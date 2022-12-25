import { Component, OnInit } from '@angular/core';
import { ExperienciaModel } from 'src/app/models/experiencia.models';
import { ExperienciaServiceService } from 'src/app/service/experiencia-service.service';
import "jquery";
import { AutenticauserService } from 'src/app/service/autenticauser.service';
//import { timer } from 'rxjs';
// import { DatePipe } from '@angular/common';

declare var $:any;

@Component({
  selector: 'app-experienciacontent',
  templateUrl: './experienciacontent.component.html',
  styleUrls: ['./experienciacontent.component.css']
})
export class ExperienciacontentComponent implements OnInit {

  estadologueado : boolean;

  experiencias : ExperienciaModel[]= [];

  estado: boolean = true;
  puedeguardar : boolean = false;
  
  id:number = 0;
  numeroimagen: string ="";
  empresa:string= "";
  puesto:string ="";
  fechainicio: Date= new Date;
  fechafin: Date = new Date;
  tarea: string ="";

  // pipe = new DatePipe('en-US');

  constructor(private servicio : ExperienciaServiceService, private autentiservice : AutenticauserService) {
    this.estadologueado = false;
  }

  ngOnInit(): void {
    this.autentiservice.conocerEstadoSesion().subscribe(estado =>{
      console.log("el estado es: "+estado);
      this.estadologueado = estado;
    });
    
    this.servicio.GetExperiencia().subscribe((resp:ExperienciaModel[])=>{
      this.experiencias = resp;
    });
  }

  // fecha(fecha: Date) {
  //   return this.pipe.transform(fecha,'dd/MM/yyyy');
  // }

  imagen(num:string){
    return {
      'background-image': 'url(/assets/images/experiencia/'+num+'.jpg)',
      'background-size':'100% 100%',
      'background-repeat': 'no-repeat',
      'height':'200px',
      'border-radius':'20px',
    };
  }
  color(){
    return {'background-color': '#FFFFFF', 'color': '#000000'}
  }

  activarEdicion(i:number){
    this.estado = false;
    this.modificaInput(i);
  }
  modificaInput(i:number){
    if(this.estado){
      $("."+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".g"+i).css({'opacity': 0.5, 'cursor':'default', 'pointer-events': 'none' })
    }else{
      $("."+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".g"+i).css({'opacity': 1, 'cursor':'pointer', 'pointer-events': 'all' })
    }
  }

  guardarDatos(i:number){
    this.experiencias.forEach(experiencia => {
      this.servicio.UpdateExperiencia(experiencia).subscribe(data =>{
        this.estado = true;
        this.puedeguardar = false;
        this.modificaInput(i);
        console.log("Datos guardados.")
      });
    });
  }

  nuevaExperiencia(tipo:boolean){
    if(tipo){
      $(".paraNuevasExpe").css({"display": "block"});
    }else{
      $(".paraNuevasExpe").css({"display": "none"});
    }
  }

  guardarNuevosDatos(){
    let num = (this.experiencias.length + 1).toString();
    let exp = new ExperienciaModel(this.id , this.empresa, this.puesto, this.fechainicio, this.fechafin, this.tarea,num);
    this.servicio.creaexperiencia(exp).subscribe(data =>{
      this.ngOnInit();
    });

    this.empresa= "";
    this.puesto ="";
    this.fechainicio= new Date;
    this.fechafin= new Date;
    this.tarea ="";

    this.nuevaExperiencia(false);

  }

  eliminar(num : number){
    this.servicio.eliminaexperiencia(num).subscribe(data =>{
      this.ngOnInit();
    });


    console.log("Se elimino el id: "+num);
  }

}
