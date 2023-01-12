import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EducacionModel } from '../models/educacion.models';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  
  private urlget="http://localhost:8080/traeeducacion"
  private urlput="http://localhost:8080/actualizaeducacion"
  private urlpost="http://localhost:8080/creaeducacion"
  private urldel="http://localhost:8080/eliminaeducacionid/"

  // private urlget="https://portfoliowebmoralesjavierignacio.onrender.com/traeeducacion"
  // private urlput="https://portfoliowebmoralesjavierignacio.onrender.com/actualizaeducacion"
  // private urlpost="https://portfoliowebmoralesjavierignacio.onrender.com/creaeducacion"
  // private urldel="https://portfoliowebmoralesjavierignacio.onrender.com/eliminaeducacionid/"

  constructor(private http:HttpClient) { }


  GetEducacion(): Observable<EducacionModel[]>
  {
    console.log("buscando datos de experiencia en servidor.")
    return this.http.get<EducacionModel[]>(this.urlget)
  }

  UpdateEducacion(educacion:EducacionModel):Observable<any>{
    return this.http.put<any>(this.urlput, educacion);
  }

  PostEducacion(educacion:EducacionModel):Observable<any>{
    return this.http.post<any>(this.urlpost, educacion);
  }

  DelEducacion(num:number):Observable<any>{
    return this.http.delete<any>(this.urldel + num);
  }
}
