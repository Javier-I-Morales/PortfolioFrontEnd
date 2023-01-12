import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonaModel } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {
  
  urlget="http://localhost:8080/traepersona";
  urlput="http://localhost:8080/actualizaPersona";

  // urlget="https://portfoliowebmoralesjavierignacio.onrender.com/traepersona";
  // urlput="https://portfoliowebmoralesjavierignacio.onrender.com/actualizaPersona";

  constructor(private http:HttpClient) {}

  GetPersona():Observable<PersonaModel>
  {
    console.log("buscando datos de persona en servidor");
    return this.http.get<PersonaModel>(this.urlget);
  }

  UpdatePersona(persona:PersonaModel):Observable<any>{
    return this.http.put<any>(this.urlput, persona);
  }
}
