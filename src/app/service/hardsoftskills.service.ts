import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HardSoftSkillsModel } from '../models/HasdSoftSkillsModel';

@Injectable({
  providedIn: 'root'
})
export class HardsoftskillsService {

  private urlget = "http://localhost:8080/traeskills";
  private urlput = "http://localhost:8080/actualizaskills";

  constructor(private http:HttpClient) {}

  getHardsoftskills():Observable<HardSoftSkillsModel[]>{
    console.log("buscando datos de skills en servidor.")
    return this.http.get<HardSoftSkillsModel[]>(this.urlget);
  }

  UpdateSkills(skill:HardSoftSkillsModel):Observable<any>{
    return this.http.put<any>(this.urlput, skill);
  }
}
