import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IncomesModule } from '../../incomes/incomes.module'
import { AppState } from './../app.state';

@Component({
  selector: 'app-basic-display',
  templateUrl: './basic-display.component.html',
  styleUrls: ['./basic-display.component.scss']
})
export class BasicDisplayComponent implements OnInit {

  // Section 1
  public incomes: Observable<IncomesModule[]>;

  // Section 2
  constructor(private _store: Store<AppState>) { 
    this.incomes = this._store.select('income');
  }

  // constructor(private store: Store<AppState>) {
  //   store.select('income').subscribe(val => this.incomes = val);
  //   console.log(this.incomes);
  // }



  ngOnInit() {
    console.log(this.incomes);
  }
  
}