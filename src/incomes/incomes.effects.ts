import { Injectable } from '@angular/core';
import { Actions, Effect, OnInitEffects, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EntityCollectionServiceFactory, EntityCollectionService} from "@ngrx/data";
import { Income } from './income';
import {mergeMap} from "rxjs/operators"
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http"


@Injectable()
export class IncomesEffects implements OnInitEffects{
	//private _incomesService: EntityCollectionService<Income>;
	//@Effect()
	initIncomes$: Observable<Income[]> = this.actions$.pipe(
		ofType("[IncomesEffects] INIT"),
		mergeMap((action) => )
		
	)
	ngrxOnInitEffects(): Action{
		return {
			type: "[IncomesEffects] INIT"
		}
	}
	constructor(private actions$: Actions) {
		//this._incomesService = serviceFactory.create("Incomes")
	}
}
