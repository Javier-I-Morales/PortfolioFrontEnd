import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticauserService } from 'src/app/service/autenticauser.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  form:FormGroup;
  constructor(private  formbuilder: FormBuilder, private autservice: AutenticauserService,
    private ruta:Router) { 
    this.form = this.formbuilder.group(
      {
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required, Validators.minLength(8)]]
      }
    )
  }

  ngOnInit(): void {
  }

  get Email(){
    return this.form.get('email');
  }
  get Password(){
    return this.form.get('password');
  }


  onEnviar(event:Event)
  {
    let correo:String = this.form.value['email'];
    let contrasena:String = this.form.value['password'];
    event.preventDefault();
    this.autservice.IniciarSesion(correo,contrasena).subscribe(data=>{
      console.log("Datos:" +JSON.stringify(data));
      this.ruta.navigate(['/portfolio']);
    });
  }
}
