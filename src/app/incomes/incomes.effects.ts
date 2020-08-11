import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ToDoActions from './incomes.actions';
import { ToDoHttpService } from './incomes.httpservice';
import Income from './incomes.model';

@Injectable()
export class incomeEffects {
  constructor(private todoService: ToDoHttpService, private action$: Actions) {}
  GetToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginGetToDoAction),
      mergeMap(action =>
        this.todoService.getToDos().pipe(
          map((data: Income[]) => {
            return ToDoActions.SuccessGetToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  CreateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginCreateToDoAction),
      mergeMap(action =>
        this.todoService.createToDos(action.payload).pipe(
          map((data: Income) => {
            return ToDoActions.SuccessCreateToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  newCreateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.NewUpdateToDoAction),
      mergeMap(action =>
        this.todoService.newCreateToDos(action.payload).pipe(
          map((data: any) => {
            console.log(data);
            return ToDoActions.newSuccessCreateToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

}