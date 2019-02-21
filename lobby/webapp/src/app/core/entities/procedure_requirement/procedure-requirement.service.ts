import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcedureRequirementService {

  private endpoint = `${environment.url}/procedures_requirement`;

  constructor(
    private http: HttpClient
  ) { }

  public insert(proceduresRequirement) {
    return this.http.post<ProcedureRequirement[]>(this.endpoint, proceduresRequirement);
  }

  public getByProcedure(procedureId: number) {
    return this.http.get<ProcedureRequirement[]>(this.endpoint, {
      params: {
        procedure_id: procedureId.toString()
      }
    });
  }

  public delete(id: number) {
    return this.http.delete<ProcedureRequirement>(this.endpoint, {
      params: {
        id: id.toString()
      }
    });
  }
}

export interface ProcedureRequirement {
  id: number;
  company_id: number;
  requirement_id: number;
  procedure_id: number;
  update_at: Date;
}
