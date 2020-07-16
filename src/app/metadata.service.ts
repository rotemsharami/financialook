import { Injectable } from '@angular/core';
import { DayOfMonth } from './interfaces/DayOfMonth';


@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  getDayOfMonth(): DayOfMonth[] {
    return [
      	{name: '1', id: '1'},
      	{name: '2', id: '2'},
      	{name: '3', id: '3'}
    ]
  };

  constructor() { }
}
