import { Component, OnInit } from '@angular/core';
import { PersonaModel } from 'src/app/models/persona.model';
import { PersonaServiceService } from 'src/app/service/persona-service.service';
import { AutenticauserService } from 'src/app/service/autenticauser.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  haydatos:boolean = false;
  errorserver:boolean = true;
  estadologueado:boolean;
  estado: boolean = true;

  puedeguardar : boolean = false;
  persona: PersonaModel = {id:0,nombre:"",apellido:"",profesion:"",imagen:""};

  nombre : string = "";
  descripcion1 : string = "";
  descripcion2 : string = "";
  descripcion3 : string = "";
  imagenperfil : string = "";
  pathpuro : string = "";

  constructor(private servicio: PersonaServiceService, private autentiservice : AutenticauserService) {

    this.estadologueado = false;
  }

  ngOnInit(): void {


    this.autentiservice.conocerEstadoSesion().subscribe(estado =>{
      this.estadologueado = estado;

      if(!this.estadologueado){
        this.estado = true;
      }
    });

    // this.servicio.GetPersona().subscribe((resp:PersonaModel)=>{
    //   this.persona = resp;
    //   this.nombre = this.persona.apellido.trim() + " " + this.persona.nombre.trim();
    //   this.descripcion1 = this.persona.profesion.split(",")[0];
    //   this.descripcion2 = this.persona.profesion.split(",")[1];
    //   this.descripcion3 = this.persona.profesion.split(",")[2];
    //   this.imagenperfil = this.persona.imagen;

    //   this.haydatos = true;
    //   this.errorserver = true;
    // },error=>{
    //   this.haydatos = true;
    //   this.errorserver = false;
    // });

    this.servicio.GetPersona().subscribe({

      next: (resp:PersonaModel)=> {this.persona = resp;
        this.nombre = this.persona.apellido.trim() + " " + this.persona.nombre.trim();
        this.descripcion1 = this.persona.profesion.split(",")[0];
        this.descripcion2 = this.persona.profesion.split(",")[1];
        this.descripcion3 = this.persona.profesion.split(",")[2];
        this.imagenperfil = this.persona.imagen;
        this.haydatos = true;
        this.errorserver = true;

      },
      error: (e)=>{
           this.haydatos = true;
           this.errorserver = false;
           console.log(e)
      },
      complete:()=> console.log("Completado.")
    });
  }

  imagenPerfil(){
    return {'width': '150px', 'height': '150px',
    'background-position': 'center',
    'background-image': 'url('+this.imagenperfil+')',
    //'background-image': 'url("/assets/images/banner/fotoperfil.jpg")',
    'background-size':'cover',
    'background-repeat':'no-repeat',
    'border-radius': '50%'
    }
  }

  activarEdicion(){
    this.estado = false;
    this.puedeguardar = true;
    this.modificaInput();
  }
  modificaInput(){
    if(this.estado){
      return {'border':'none','background-color':'#FFF'}
    }else{
      return {'border':'solid 1px black','background-color':'#ffffef'}
    }

  }
  lapizEditar(){
    return {'background-image':'/assets/images/botones/editar.png'};
  }
  puedeGuardar(){
    if(this.puedeguardar){
      return  {'opacity':1,'cursor':'pointer', 'pointer-events':'all'};
    }else{
      return {'opacity':0.5,'cursor':'default', 'pointer-events':'none'};
    }
  }
  guardarDatos(){
    this.persona.apellido = this.nombre.split(" ")[0];
    this.persona.nombre = this.nombre.split(" ")[1];
    this.persona.profesion = this.descripcion1 + "," + this.descripcion2 + "," + this.descripcion3;

    if(this.pathpuro.length > 1){
      let pathUnSplit = this.pathpuro.split('/d/');
      let pathDosSplit = pathUnSplit[1].split("/view");
      this.persona.imagen = "https://drive.google.com/uc?export=view&id="+pathDosSplit[0];
      console.log(this.persona.imagen);
    }


    this.servicio.UpdatePersona(this.persona).subscribe(data =>{
      console.log(data);
      this.estado = true;
      this.puedeguardar = false;
      this.modificaInput();

      this.ngOnInit();
    });


  }




}
