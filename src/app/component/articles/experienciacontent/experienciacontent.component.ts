import { Component, OnInit } from '@angular/core';
import { ExperienciaModel } from 'src/app/models/experiencia.models';
import { ExperienciaServiceService } from 'src/app/service/experiencia-service.service';
import "jquery";
import { AutenticauserService } from 'src/app/service/autenticauser.service';

//import { timer } from 'rxjs';
import { DATE_PIPE_DEFAULT_TIMEZONE, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

  pathpuro : string = "";

  pipe = new DatePipe('en-US');

  constructor(private servicio : ExperienciaServiceService,
    private autentiservice : AutenticauserService,
    private http : HttpClient) {
    this.estadologueado = false;
  }

  ngOnInit(): void {
    this.autentiservice.conocerEstadoSesion().subscribe(estado =>{
      //console.log("el estado es: "+estado);
      this.estadologueado = estado;
      console.log(estado);
      if(!this.estadologueado){
        this.estado = true;
        this.desactivarEdicion();
      }
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

  desactivarEdicion(){
    for(var i = 0; i <=5;i++){
      this.modificaInput(i);
    }
  }

  obtenerfecha(fecha: Date) {
    return fecha != null ? fecha.toLocaleDateString(): "Aún en proceso.";
  }

  ruta(num :string){
    return "/assets/images/experiencia/"+num+".jpg";
  }

  // imagen(pathimagen:string){
  //   return {
  //     //'background-image': 'url('+pathimagen+')',
  //     'background-size':'100% 100%',
  //     'background-repeat': 'no-repeat',
  //     'height':'200px',
  //     'border-radius':'20px',
  //   };
  // }

  imagen(){
    return {
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
      $(".empresaex"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".puestoex"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".fechainicioex"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".fechafinex"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".tareaex"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".g"+i).css({'opacity': 0.5, 'cursor':'default', 'pointer-events': 'none' })
    }else{
      $(".empresaex"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".puestoex"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".fechafinex"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".fechainicioex"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".tareaex"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
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

    this.id = $(".idex"+i).val();
    this.empresa = $(".empresaex"+i).val();
    this.puesto = $(".puestoex"+i).val();
    this.fechainicio = this.traefecha($(".fechainicioex"+i).val());
    this.fechafin = this.traefecha($(".fechafinex"+i).val());
    this.tarea = $(".tareaex"+i).val();

    if(this.pathpuro.length > 1){
      let pathUnSplit = this.pathpuro.split('/d/');
      let pathDosSplit = pathUnSplit[1].split("/view");
      this.numeroimagen = "https://drive.google.com/uc?export=view&id="+pathDosSplit[0];
    }else{
      this.numeroimagen = $(".imagenex"+i).val();
    }


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
      this.ngOnInit();
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
    //let num = (this.experiencias.length + 1).toString();
    if(this.pathpuro.length > 1){
      let pathUnSplit = this.pathpuro.split('/d/');
      let pathDosSplit = pathUnSplit[1].split("/view");
      this.numeroimagen = "https://drive.google.com/uc?export=view&id="+pathDosSplit[0];
    }else{
      this.numeroimagen = "";
    }
    let exp = new ExperienciaModel(this.id , this.empresa, this.puesto, this.fechainicio, this.fechafin, this.tarea,this.numeroimagen);
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
