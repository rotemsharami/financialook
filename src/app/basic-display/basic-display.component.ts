import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as incomesActions from '../incomes/incomes.actions';
import Income  from '../incomes/incomes.model'
import incomesState, { initializeState } from '../incomes/incomes.state';

@Component({
  selector: 'app-basic-display',
  templateUrl: './basic-display.component.html',
  styleUrls: ['./basic-display.component.scss']
})
export class BasicDisplayComponent implements OnInit {
  constructor(private store: Store<{ incomes: incomesState }>) {
    this.todo$ = store.pipe(select('incomes'));
  }
  ngOnInit() {
    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          this.ToDoList = x.incomes;
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();
    this.store.dispatch(incomesActions.BeginGetToDoAction());
  }
  todo$: Observable<incomesState>;
  ToDoSubscription: Subscription;
  ToDoList: Income[] = [];
  todoError: Error = null;
  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}