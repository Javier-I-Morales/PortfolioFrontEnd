import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProyectoModels } from '../models/proyecto.models';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private url="http://localhost:8080/traeproyectos";
  private urlput="http://localhost:8080/actualizaproyecto"
  private urlpost="http://localhost:8080/creaproyecto"
  private urldel="http://localhost:8080/eliminaproyectoid/"

  constructor(private http:HttpClient) {}

  getProyectos():Observable<ProyectoModels[]>{
    return this.http.get<ProyectoModels[]>(this.url);
  }

  UpdateProyecto(proyecto:ProyectoModels):Observable<any>{
    return this.http.put<any>(this.urlput, proyecto);
  }

  PostProyecto(proyecto:ProyectoModels):Observable<any>{
    return this.http.post<any>(this.urlpost, proyecto);
  }

  DelProyecto(num:number):Observable<any>{
    return this.http.delete<any>(this.urldel + num);
  }
}
