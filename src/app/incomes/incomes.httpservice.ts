import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Income from './incomes.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoHttpService {
  private ApiURL: string = 'http://localhost:3000/incomes';
  constructor(private httpclient: HttpClient) {}

  getToDos(): Observable<Income[]> {
    return this.httpclient.get<Income[]>(this.ApiURL);
  }

  createToDos(payload: Income): Observable<Income> {
    return this.httpclient.post<Income>(this.ApiURL, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}