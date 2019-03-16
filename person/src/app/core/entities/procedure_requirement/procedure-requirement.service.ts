import { AppStorageService } from './../../app-storage/app-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcedureRequirementService {

  private endpoint = `${environment.url}/procedures_requirement`;

  constructor(
    private http: HttpClient,
    private appStorageService: AppStorageService
  ) { }

  public insert(proceduresRequirement) {
    return this.http.post<ProcedureRequirement[]>(this.endpoint, proceduresRequirement);
  }

  public getByProcedure(procedureId: number) {
    return this.http.get<ProcedureRequirements>(this.endpoint, {
      params: {
        procedure_id: procedureId.toString()
      }
    });
  }

  public getByProcedureList(procedureList: number[]) {
    return this.http.get<ProcedureRequirements>(`${environment.url}/requirement_list_procedures`, {
      params: {
        procedures: procedureList.join(`,`)
      }
    });
  }

  public delete(id: number) {
    return this.http.get<ProcedureRequirement>(`${environment.url}/delete/procedures_requirement`, {
      params: {
        id: id.toString()
      }
    });
  }
}

export interface ProcedureRequirements {
  contents: ProcedureRequirement[];
}

export interface ProcedureRequirement {
  id: number;
  company_id: number;
  requirement_id: number;
  procedure_id: number;
  update_at: Date;
}
