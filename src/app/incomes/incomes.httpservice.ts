import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Income from './incomes.model';
import Incomes from './incomes-items.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoHttpService {
  private ApiURL: string = 'http://localhost:3000/incomes';
  private ApiInsert: string = 'http://localhost:3000';
  constructor(private httpclient: HttpClient) {}

  getToDos(): Observable<Income[]> {
    return this.httpclient.get<Income[]>(this.ApiURL);
  }

  createToDos(payload: Income): Observable<Income> {
    return this.httpclient.post<Income>(this.ApiURL, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  newCreateToDos(payload: any): Observable<any> {
    return this.httpclient.post<any>(this.ApiInsert, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }



  

}