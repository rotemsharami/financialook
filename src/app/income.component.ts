import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DayOfMonth } from './interfaces/DayOfMonth';
import { MethodsofPayment } from './interfaces/BasicInterfaceses';
import { MetadataService } from './metadata.service';

import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as incomesActions from './incomes/incomes.actions';
import Income from './incomes/incomes.model'
import Incomes from './incomes/incomes-items.model'
import incomesState, { initializeState } from './incomes/incomes.state';


//[ { "id": 0, "title": "FFF", "amount": "11000", "PayDay": "10", "methodsofPayment": "1" }, { "id": 1, "title": "HHH", "amount": "2500", "PayDay": "15", "methodsofPayment": "3" } ]

@Component({
    selector: 'Income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss']
})

export class IncomeComponent implements OnInit{
    incomeForm: FormGroup;
	dayOfMonthItems: DayOfMonth[];
	methodsofPaymentItems: MethodsofPayment[];
	
	fLdata: any;
	  constructor(
			private metadataService: MetadataService,
			private fb: FormBuilder,
			private store: Store<{ incomes: incomesState }>
		){
			this.dayOfMonthItems = this.metadataService.getDayOfMonth();
			this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();
			this.fLdata = this.metadataService.getData();
			this.todo$ = store.pipe(select('incomes'));
	}
	addIncome(){
		const item = this.fb.group({
			title: "",
			amount:"",
			payDay: "",
			methodsofPayment: ""
		})
		this.IncomeFormObj.push(item);
	}
	removeIncome(i){
		this.IncomeFormObj.removeAt(i)
	}
	ngOnInit(){
		this.ToDoSubscription = this.todo$
		.pipe(
			map(x => {
				this.incomesList = x.incomes;
				this.todoError = x.ToDoError;
				this.incomeForm = new FormGroup({
					incomes: this.fb.array([])
				});
				this.incomesList.forEach((obj, index) => {
					const item = this.fb.group({
						title: obj.title,
						amount: obj.amount,
						payDay: obj.payDay,
						methodsofPayment: obj.methodsofPayment
					})
					this.IncomeFormObj.push(item);
				});


				this.incomeForm.valueChanges.subscribe(val => {
					// this.metadataService.updateDataSource({type: "income", data: this.incomeForm.value});
					//this.metadataService.updateData({type: "income", data: this.incomeForm.value});
					//console.log( this.incomeForm.value);
					//this.fLdata.income = this.incomeForm.value;
					console.log("ddd");
					this.createToDo();
				});


			})
		)
		.subscribe();
		this.store.dispatch(incomesActions.BeginGetToDoAction());

		

		//this.fLdata = this.metadataService.getData();
		//if(this.fLdata.income != undefined){
			// this.incomeForm = new FormGroup({
			// 	incomes: this.fb.array([])
			// });
			//if(this.fLdata.income != undefined){
				//if(this.fLdata.income.incomes.length > 0){
					// this.fLdata.income.incomes.forEach((obj, index) => {
					// 	const item = this.fb.group({
					// 		title: obj.title,
					// 		amount: obj.amount,
					// 		payDay: obj.payDay,
					// 		methodsofPayment: obj.methodsofPayment
					// 	})
					// 	this.IncomeFormObj.push(item);
					// });
				//}
			//}
		// }else{
		// 	this.incomeForm = new FormGroup({
		// 		incomes: this.fb.array([])
		// 	});
		// }


	}

	createToDo() {
		const json_v = [ {"title": "Job", "amount": "11000", "PayDay": "10", "methodsofPayment": "1" }, {"title": "Realestate", "amount": "2500", "PayDay": "15", "methodsofPayment": "3" }];
		const incomes: any = json_v;
		this.store.dispatch(incomesActions.NewUpdateToDoAction({ payload: incomes }));

		
	}


	todo$: Observable<incomesState>;
	ToDoSubscription: Subscription;
	incomesList: Income[] = [];
	todoError: Error = null;
	
	ngOnDestroy() {
		if (this.ToDoSubscription) {
			this.ToDoSubscription.unsubscribe();
		}
	}



	get IncomeFormObj(){
		return this.incomeForm.get("incomes") as FormArray
	}
}