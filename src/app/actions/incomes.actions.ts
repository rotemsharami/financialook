import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { IncomesModule } from '../../incomes/incomes.module'

// Section 2
export const ADD_INCOME       = '[INCOMES] Add'
export const REMOVE_INCOME    = '[INCOMES] Remove'

// Section 3
export class AddIncome implements Action {
    readonly type = ADD_INCOME

    constructor(public payload: IncomesModule) {}
}

export class RemoveIncome implements Action {
    readonly type = REMOVE_INCOME

    constructor(public payload: number) {}
}

// Section 4
export type Actions = AddIncome | RemoveIncome