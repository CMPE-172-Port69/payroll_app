import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface DBResponse {
  data: any;
  resp: any;
}

@Injectable()
export class PayrollService {
  constructor(private http: HttpClient) { }

  salaryHistory(id?: string) {
    return this.http.get<DBResponse>(`${environment.api}/salary?id=${id}`);
  };

  user(id: string) {
    return this.http.get<DBResponse>(`${environment.api}/employee/${id}`);
  }

  addSalary(salary: string, id?: string) {
    return this.http.post<DBResponse>(`${environment.api}/salary?id=${id}`, {salary});
  }
};
