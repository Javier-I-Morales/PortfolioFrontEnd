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

  pathpuroes : string = "";
  // pipe = new DatePipe('en-US');
  estilo = {'background-color': 'blue', 'color': 'red'};

  constructor(private servicio : EducacionService, private autentiservice : AutenticauserService) {
    this.estadologueado = false;
  }

  ngOnInit(): void {

    this.autentiservice.conocerEstadoSesion().subscribe(estado =>{
      this.estadologueado = estado;
      if(!this.estadologueado){
        this.estado = true;
        this.desactivarEdicion();
      }
    });

    this.servicio.GetEducacion().subscribe((resp:EducacionModel[])=>{
      this.estudios = resp;
      this.estudios.forEach(est => {

        est.fechainicio= new Date(est.fechainicio);
        if(est.fechafin != null){
          est.fechafin= new Date(est.fechafin);
        }
      });
    })

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
    return "/assets/images/estudio/"+num+".jpg";
  }

  imagen(pathimagen : string){
    return {
      //'background-image': 'url('+pathimagen+')',
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
      $(".instituto"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".fechainicioes"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".fechafines"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".titulo"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".g"+i).css({'opacity': 0.5, 'cursor':'default', 'pointer-events': 'none' })
    }else{
      $(".instituto"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".fechafines"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".fechainicioes"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".titulo"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
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

    this.id = $(".idestu"+i).val();
    this.instituto = $(".instituto"+i).val();
    this.fechainicio = this.traefecha($(".fechainicioes"+i).val());
    this.fechafin = this.traefecha($(".fechafines"+i).val());
    this.titulo = $(".titulo"+i).val();
    this.numeroimagen = $(".pathpuroes"+i).val();

    if(this.numeroimagen.length > 1){
      let pathUnSplit = this.numeroimagen.split('/d/');
      let pathDosSplit = pathUnSplit[1].split("/view");
      this.numeroimagen = "https://drive.google.com/uc?export=view&id="+pathDosSplit[0];
    }else{
      this.numeroimagen = $(".imagenest"+i).val();
    }

    let estudio : EducacionModel = new EducacionModel(
      this.id,
      this.instituto,
      this.fechainicio,
      this.fechafin,
      this.titulo,
      this.numeroimagen
    );

    this.servicio.UpdateEducacion(estudio).subscribe(data =>{
      this.estado = true;
      this.puedeguardar = false;
      this.id = 0;
      this.modificaInput(i);
      console.log("Datos actualizados.")
      this.ngOnInit();
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
    //let num = (this.estudios.length + 1).toString();
    if(this.pathpuroes.length > 1){
      let pathUnSplit = this.pathpuroes.split('/d/');
      let pathDosSplit = pathUnSplit[1].split("/view");
      this.numeroimagen = "https://drive.google.com/uc?export=view&id="+pathDosSplit[0];
    }else{
      this.numeroimagen = "";
    }

    let educacion = new EducacionModel(this.id , this.instituto, this.fechainicio, this.fechafin, this.titulo, this.numeroimagen);
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
