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

  constructor(private servicio:ProyectoService, private autentiservice : AutenticauserService) { 
    this.estadologueado = false;
  }

  ngOnInit(): void {
    this.autentiservice.conocerEstadoSesion().subscribe(estado =>{
      this.estadologueado = estado;
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


  color(){

    return {'background-color': '#FFFFFF', 'color': '#000000'};

  }

  obtenerfecha(fecha: Date) {
    return fecha != null ? fecha.toLocaleDateString(): "Aún en proceso.";
  }

  imagen(numI : string, numII : string){
    return {
      'background-image': 'url(/assets/images/proyecto/'+numI+'/'+numII+'.jpg)',
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
      $(".descripcion"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".nombre"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".fecharealizacion"+i).css({'background-color': '#FFFFFF','border': 'none' })
      $(".g"+i).css({'opacity': 0.5, 'cursor':'default', 'pointer-events': 'none' })
    }else{
      $(".descripcion"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".nombre"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
      $(".fecharealizacion"+i).css({'background-color': '#ffffef','border': 'solid 1px black' })
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
    this.descripcion = $(".descripcion"+i).val();
    this.fecharealizacion = this.traefecha($(".fecharealizacion"+i).val());
    this.nombre = $(".nombre"+i).val();
    this.link = $(".imagen"+i).val();

    let proyecto : ProyectoModels = new ProyectoModels(
      this.id,
      this.nombre,
      this.fecharealizacion,
      this.link,
      this.descripcion
      );

    this.servicio.UpdateProyecto(proyecto).subscribe(data =>{
      this.estado = true;
      this.puedeguardar = false;
      this.id = 0;
      this.modificaInput(i);
      console.log("Datos guardados.")
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
    let num = (this.proyectos.length + 1).toString();
    let proyecto = new ProyectoModels(this.id , this.nombre, this.fecharealizacion, num, this.descripcion );
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
