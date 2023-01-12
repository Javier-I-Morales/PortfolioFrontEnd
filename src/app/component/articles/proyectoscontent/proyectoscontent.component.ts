import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProyectoModels } from 'src/app/models/proyecto.models';
import { ProyectoService } from 'src/app/service/proyecto.service';
import "jquery";
import { AutenticauserService } from 'src/app/service/autenticauser.service';

declare var $: any;

@Component({
  selector: 'app-proyectoscontent',
  templateUrl: './proyectoscontent.component.html',
  styleUrls: ['./proyectoscontent.component.css']
})
export class ProyectoscontentComponent implements OnInit {

  proyectos : ProyectoModels[] = [];
  estadologueado : boolean;

  cadena : string[] = ["1","2"];
  cadenas : string[]=[];

  estado: boolean = true;
  puedeguardar : boolean = false;

  id:number = 0;
  nombre: string = "";
  fecharealizacion:Date = new Date;
  descripcion: string ="";
  link:string ="";
  linkdos:string ="";

  pathpurouno : string = "";
  pathpurodos : string = "";

  constructor(private servicio:ProyectoService, private autentiservice : AutenticauserService) { 
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

    this.servicio.getProyectos().subscribe((resp:ProyectoModels[])=>{
      this.proyectos = resp;
      this.cadenas = this.cadena;

      this.proyectos.forEach(pro => {
        if(pro.fecharealizacion != null){
          pro.fecharealizacion= new Date(pro.fecharealizacion);
        }
      });
    });
  }

  desactivarEdicion(){
    for(var i = 0; i <=5;i++){
      this.modificaInput(i);
    }
  }


  color(){

    return {'background-color': '#FFFFFF', 'color': '#000000'};

  }

  obtenerfecha(fecha: Date) {
    return fecha != null ? fecha.toLocaleDateString(): "Aún en proceso.";
  }

  imagen(path : string){
    return {
      'background-image': 'url('+path+')',
      'background-size':'100% 100%',
      'background-repeat': 'no-repeat',
      'height':'200px',
      'border-radius':'20px',
    };
  }


  activarEdicion(i:number){
    this.estado = false;
    this.modificaInput(i);
  }
  modificaInput(i:number){
    if(this.estado){
      $(".descripcionpro"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".nombrepro"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".fecharealizacionpro"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".g"+i).css({'opacity': 0.5, 'cursor':'default', 'pointer-events': 'none' })
    }else{
      $(".descripcionpro"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".nombrepro"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".fecharealizacionpro"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
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

    this.id = $(".idpro"+i).val();
    this.descripcion = $(".descripcionpro"+i).val();
    this.fecharealizacion = this.traefecha($(".fecharealizacionpro"+i).val());
    this.nombre = $(".nombrepro"+i).val();
    this.link = $(".pathpurouno"+i).val();
    this.linkdos = $(".pathpurodos"+i).val();

    if(this.link.length > 1){
      let pathUnSplit = this.link.split('/d/');
      let pathDosSplit = pathUnSplit[1].split("/view");
      this.link = "https://drive.google.com/uc?export=view&id="+pathDosSplit[0];
    }else{
      this.link = $(".imagenprouno"+i).val();
    }

    if(this.linkdos.length > 1){
      let pathUnSplit = this.linkdos.split('/d/');
      let pathDosSplit = pathUnSplit[1].split("/view");
      this.linkdos = "https://drive.google.com/uc?export=view&id="+pathDosSplit[0];
    }else{
      this.linkdos = $(".imagenprodos"+i).val();
    }



    let proyecto : ProyectoModels = new ProyectoModels(
      this.id,
      this.nombre,
      this.fecharealizacion,
      this.link,
      this.descripcion,
      this.linkdos,
      );

    this.servicio.UpdateProyecto(proyecto).subscribe(data =>{
      this.estado = true;
      this.puedeguardar = false;
      this.id = 0;
      this.modificaInput(i);
      console.log("Datos guardados.")
      this.ngOnInit();
    });
  }

  nuevoProyecto(tipo:boolean){
    if(tipo){
      $(".paraNuevosEdu").css({"display": "block"});
    }else{
      $(".paraNuevosEdu").css({"display": "none"});
    }
  }

  guardarNuevosDatos(){
    //let num = (this.proyectos.length + 1).toString();

    if(this.pathpurouno.length > 1){
      let pathUnSplit = this.pathpurouno.split('/d/');
      let pathDosSplit = pathUnSplit[1].split("/view");
      this.link = "https://drive.google.com/uc?export=view&id="+pathDosSplit[0];
    }else{
      this.link = "";
    }
    if(this.pathpurodos.length > 1){
      let pathUnSplit = this.pathpurodos.split('/d/');
      let pathDosSplit = pathUnSplit[1].split("/view");
      this.linkdos = "https://drive.google.com/uc?export=view&id="+pathDosSplit[0];
    }else{
      this.linkdos= "";
    }




    let proyecto = new ProyectoModels(this.id , this.nombre, this.fecharealizacion, this.link, this.descripcion, this.linkdos );
    this.servicio.PostProyecto(proyecto).subscribe(data =>{
      this.ngOnInit();
    });

    this.nombre= "";
    this.fecharealizacion= new Date;
    this.descripcion ="";

    this.nuevoProyecto(false);

  }

  eliminar(num : number){
    this.servicio.DelProyecto(num).subscribe(data =>{
      this.ngOnInit();
    });


    console.log("Se elimino el id: "+num);
  }

}
