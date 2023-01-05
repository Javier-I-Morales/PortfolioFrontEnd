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

  //login:boolean = sessionStorage.getItem('estado') ==="1"? true:false;
  estadologueado:boolean;
  estado: boolean = true;
  //es:string = localStorage.getItem('estado')|| "";
  puedeguardar : boolean = false;
  persona: PersonaModel = {id:0,nombre:"",apellido:"",profesion:"",imagen:""};

  nombre : string = "";
  descripcion1 : string = "";
  descripcion2 : string = "";
  descripcion3 : string = "";

  constructor(private servicio: PersonaServiceService, private autentiservice : AutenticauserService) {

    this.estadologueado = false;
  }

  ngOnInit(): void {


    this.autentiservice.conocerEstadoSesion().subscribe(estado =>{
      this.estadologueado = estado;
    });

    this.servicio.GetPersona().subscribe((resp:PersonaModel)=>{
      this.persona = resp;
      this.nombre = this.persona.apellido.trim() + " " + this.persona.nombre.trim();
      this.descripcion1 = this.persona.profesion.split(",")[0];
      this.descripcion2 = this.persona.profesion.split(",")[1];
      this.descripcion3 = this.persona.profesion.split(",")[2];
    });

  }

  imagenPerfil(){
    return {'width': '100px', 'height': '100px',
    'background-position': 'center',
    'background-image': 'url("/assets/images/banner/fotoperfil.jpg")',
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

    this.servicio.UpdatePersona(this.persona).subscribe(data =>{
      console.log(data);
      this.estado = true;
      this.puedeguardar = false;
      this.modificaInput();
    });
  }


  // cambiarImagen(event:Event): any{
  //   const archivo = (<HTMLInputElement>event.target).files?.item(0);
  //   console.log(archivo);
  // }

}
