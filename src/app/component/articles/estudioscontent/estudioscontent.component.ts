import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EducacionModel } from 'src/app/models/educacion.models';
import { EducacionService } from 'src/app/service/educacion.service';
import "jquery";
import { AutenticauserService } from 'src/app/service/autenticauser.service';

declare var $: any;

@Component({
  selector: 'app-estudioscontent',
  templateUrl: './estudioscontent.component.html',
  styleUrls: ['./estudioscontent.component.css']
})
export class EstudioscontentComponent implements OnInit {

  estudios : EducacionModel[]= [];
  estadologueado : boolean;

  estado: boolean = true;
  puedeguardar : boolean = false;

  id:number = 0;
  instituto: string = "";
  fechainicio:Date = new Date;
  fechafin:Date = new Date;
  titulo: string ="";
  numeroimagen:string ="";


  // pipe = new DatePipe('en-US');
  estilo = {'background-color': 'blue', 'color': 'red'};

  constructor(private servicio : EducacionService, private autentiservice : AutenticauserService) {
    this.estadologueado = false;
  }

  ngOnInit(): void {

    this.autentiservice.conocerEstadoSesion().subscribe(estado =>{
      console.log("el estado es: "+estado);
      this.estadologueado = estado;
    });

    this.servicio.GetEducacion().subscribe((resp:EducacionModel[])=>{
      //console.log(resp);
      this.estudios = resp;
    })
  }

  ruta(num :string){
    return "/assets/images/estudio/"+num+".jpg";
  }

  imagen(num : string){
    return {
      'background-image': 'url(/assets/images/estudio/'+num+'.jpg)',
      'background-size':'100% 100%',
      'background-repeat': 'no-repeat',
      'height':'200px',
      'border-radius':'20px',
    };
  }


  color(){

    return {'background-color': '#FFFFFF', 'color': '#000000'};

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
    this.estudios.forEach(estudio => {
      this.servicio.UpdateEducacion(estudio).subscribe(data =>{
        this.estado = true;
        this.puedeguardar = false;
        this.modificaInput(i);
        console.log("Datos guardados.")
      });
    });
  }

  nuevaEducacion(tipo:boolean){
    if(tipo){
      $(".paraNuevosEdu").css({"display": "block"});
    }else{
      $(".paraNuevosEdu").css({"display": "none"});
    }
  }

  guardarNuevosDatos(){
    let num = (this.estudios.length + 1).toString();
    let educacion = new EducacionModel(this.id , this.instituto, this.fechainicio, this.fechafin, this.titulo, num);
    this.servicio.PostEducacion(educacion).subscribe(data =>{
      this.ngOnInit();
    });

    this.instituto= "";
    this.fechainicio= new Date;
    this.fechafin= new Date;
    this.titulo ="";

    this.nuevaEducacion(false);

  }

  eliminar(num : number){
    this.servicio.DelEducacion(num).subscribe(data =>{
      this.ngOnInit();
    });


    console.log("Se elimino el id: "+num);
  }

}
