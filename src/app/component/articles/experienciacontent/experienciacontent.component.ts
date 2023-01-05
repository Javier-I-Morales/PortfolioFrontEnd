import { Component, OnInit } from '@angular/core';
import { ExperienciaModel } from 'src/app/models/experiencia.models';
import { ExperienciaServiceService } from 'src/app/service/experiencia-service.service';
import "jquery";
import { AutenticauserService } from 'src/app/service/autenticauser.service';

//import { timer } from 'rxjs';
import { DATE_PIPE_DEFAULT_TIMEZONE, DatePipe } from '@angular/common';

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

  pipe = new DatePipe('en-US');

  constructor(private servicio : ExperienciaServiceService, private autentiservice : AutenticauserService) {
    this.estadologueado = false;
  }

  ngOnInit(): void {
    this.autentiservice.conocerEstadoSesion().subscribe(estado =>{
      //console.log("el estado es: "+estado);
      this.estadologueado = estado;
    });
    
    this.servicio.GetExperiencia().subscribe((resp:ExperienciaModel[])=>{
      this.experiencias = resp;
      this.experiencias.forEach(exp => {
          exp.fechainicio= new Date(exp.fechainicio);
          if(exp.fechafin != null){
            exp.fechafin= new Date(exp.fechafin);
          }
      });
    });

    
  }

  obtenerfecha(fecha: Date) {
    return fecha != null ? fecha.toLocaleDateString(): "Aún en proceso.";
  }

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
      $(".empresa"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".puesto"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".fechainicio"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".fechafin"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".tarea"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".g"+i).css({'opacity': 0.5, 'cursor':'default', 'pointer-events': 'none' })
    }else{
      $(".empresa"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".puesto"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".fechafin"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".fechainicio"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".tarea"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".g"+i).css({'opacity': 1, 'cursor':'pointer', 'pointer-events': 'all' })
    }
  }

  traefecha(date:string){

    let cadena = date.split("/");

    let dia = parseInt(cadena[0]);
    let mes = parseInt(cadena[1])-1;
    let ano = parseInt(cadena[2]);
    let fecha = new Date(ano, mes, dia);
    return fecha; 
  }
  guardarDatos(i:number){

    this.id = $(".id"+i).val();
    this.empresa = $(".empresa"+i).val();
    this.puesto = $(".puesto"+i).val();
    this.fechainicio = this.traefecha($(".fechainicio"+i).val());
    this.fechafin = this.traefecha($(".fechafin"+i).val());
    this.tarea = $(".tarea"+i).val();
    this.numeroimagen = $(".imagen"+i).val();

    let experiencia : ExperienciaModel = new ExperienciaModel(
      this.id,
      this.empresa,
      this.puesto,
      this.fechainicio,
      this.fechafin,
      this.tarea,
      this.numeroimagen
    );

    this.servicio.UpdateExperiencia(experiencia).subscribe(data =>{
      this.estado = true;
      this.puedeguardar = false;
      this.id = 0;
      this.modificaInput(i);
      console.log("Datos actualizados.");
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
