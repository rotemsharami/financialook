import { Injectable } from '@angular/core';
import { Actions, Effect, OnInitEffects, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EntityCollectionServiceFactory, EntityCollectionService} from "@ngrx/data";
import { Income } from './income';
import {mergeMap} from "rxjs/operators"
import { Observable } from 'rxjs';

@Injectable()
export class IncomesEffects implements OnInitEffects{
	private _incomesService: EntityCollectionService<Income>;
	@Effect()
	initIncomes$: Observable<Income[]> = this.actions$.pipe(
		ofType("INIT_INCOMES"),
		mergeMap(() => {
			return this._incomesService.getAll()
		})
		
	)
	ngrxOnInitEffects(): Action{
		return {
			type: "INIT_INCOMES"
		}
	}
	constructor(private actions$: Actions, serviceFactory: EntityCollectionServiceFactory) {
		this._incomesService = serviceFactory.create("Incomes")
	}
}
