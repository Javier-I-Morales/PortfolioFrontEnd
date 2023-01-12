import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { UsuarioModel } from '../models/usuario.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticauserService {

  private urlaut="http://localhost:8080/existeuser/";
  //private urlaut="https://portfoliowebmoralesjavierignacio.onrender.com/existeuser/";

  private sesionActiva: boolean;
  private sesionActiva$ : Subject<boolean>;
  private sesionActivaB : BehaviorSubject<boolean>;
  
  currentUserSubject:BehaviorSubject<any>;

  constructor(private http:HttpClient) { 

    this.sesionActiva = false;
    this.sesionActiva$ = new Subject<boolean>();
    this.sesionActivaB = new BehaviorSubject<boolean>(false);

    console.log("El servicio esta corriendo.");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(
      sessionStorage.getItem('currentUser') || "{}"));

  }

  IniciarSesion(email:String, pass:String): Observable<any>
  {
    console.log("buscando datos de usuario en servidor.")
    return this.http.get<any>(this.urlaut+email+"/"+pass).pipe(map(data =>{
      sessionStorage.setItem('currentUser',JSON.stringify(data)),
      //sessionStorage.setItem('estado',JSON.stringify(data))
      //console.log("el estado es"+sessionStorage.getItem('estado'))
      this.sesionActiva = true;
      this.sesionActiva$.next(this.sesionActiva);
      this.sesionActivaB.next(this.sesionActiva);
      return data;
    }))
  }

  CerrarSesion(){
    this.sesionActiva = false;
    this.sesionActivaB.next(this.sesionActiva);
  }

  conocerEstadoSesion():BehaviorSubject<boolean>{
    return this.sesionActivaB;
  }

}
