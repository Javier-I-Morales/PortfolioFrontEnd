import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperienciaModel } from '../models/experiencia.models';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaServiceService {

  private urlget = "http://localhost:8080/traeexperiencia";
  private urlput = "http://localhost:8080/actualizaexperiencia";
  private urlpost = "http://localhost:8080/creaexperiencia";
  private urldel = "http://localhost:8080/eliminaexperienciaid/";

  constructor( private http: HttpClient) { }

  GetExperiencia(): Observable<ExperienciaModel[]>
  {
    console.log("buscando datos de experiencia en servidor.")
    return this.http.get<ExperienciaModel[]>(this.urlget)
  }

  UpdateExperiencia(experiencia:ExperienciaModel):Observable<any>{
    return this.http.put<any>(this.urlput, experiencia);
  }

  creaexperiencia(experiencia:ExperienciaModel):Observable<any>{
    return this.http.post<any>(this.urlpost, experiencia);
  }

  eliminaexperiencia(num:number):Observable<any>{
    return this.http.delete<any>(this.urldel + num);
  }

}
