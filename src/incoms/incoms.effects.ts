import { Injectable } from '@angular/core';
import { Actions, Effect, OnInitEffects, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EntityCollectionServiceFactory, EntityCollectionService} from "@ngrx/data";
import { Income } from './income';
import {mergeMap} from "rxjs/operators"
import { Observable } from 'rxjs';

@Injectable()
export class IncomsEffects implements OnInitEffects{
	private _incomsService: EntityCollectionService<Income>;

	@Effect()
	initIncoms$: Observable<Income[]> = this.actions$.pipe(
		ofType("INIT_EXPENCES"),
		mergeMap(() => {
			return this._incomsService.getAll()
		})
		
	)


	ngrxOnInitEffects(): Action{
		return {
			type: "INIT_EXPENCES"
		}
	}
	constructor(private actions$: Actions, serviceFactory: EntityCollectionServiceFactory) {
		this._incomsService = serviceFactory.create("Incoms")
	}
}
