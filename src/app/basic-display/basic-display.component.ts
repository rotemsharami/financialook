import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ToDoActions from '../incomes/incomes.actions';
import Income  from '../incomes/incomes.model'
import ToDoState, { initializeState } from '../incomes/todo.state';

@Component({
  selector: 'app-basic-display',
  templateUrl: './basic-display.component.html',
  styleUrls: ['./basic-display.component.scss']
})
export class BasicDisplayComponent implements OnInit {

  constructor(private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select('todos'));
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
    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }

  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  ToDoList: Income[] = [];

  Title: string = '';
  IsCompleted: boolean = false;

  todoError: Error = null;

  createToDo() {
    // const todo: Income = { Title: this.Title, IsCompleted: this.IsCompleted };
    // this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    // this.Title = '';
    // this.IsCompleted = false;
  }

  ngOnDestroy() {
    if (this.ToDoSubscription) {
      //this.ToDoSubscription.unsubscribe();
    }
  }
  
}