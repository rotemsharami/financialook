import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DayOfMonth } from './interfaces/DayOfMonth';
import { MethodsofPayment } from './interfaces/BasicInterfaceses';
import { MetadataService } from './metadata.service';
@Component({
	selector: 'Income',
	templateUrl: './income.component.html',
	styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit{
	data:any;
	newData:any;
	incomeForm: FormGroup;
	dayOfMonthItems: DayOfMonth[];
	methodsofPaymentItems: MethodsofPayment[];
	constructor(
		private metadataService: MetadataService,
		private fb: FormBuilder){
		this.dayOfMonthItems = this.metadataService.getDayOfMonth();
		this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();
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
		this.metadataService.cast.subscribe(user=> this.data = user);
		if(this.data != undefined){
			if(this.data.incomes != undefined){
				this.incomeForm = new FormGroup({
					incomes: this.fb.array([])
				});
				if(this.data.incomes != undefined){
					if(this.data.incomes.length > 0){
						this.data.incomes.forEach((obj, index) => {
							const item = this.fb.group({
								title: obj.title,
								amount: obj.amount,
								payDay: obj.payDay,
								methodsofPayment: obj.methodsofPayment
							})
							this.IncomeFormObj.push(item);
						});
					}
				}
			}
			else{
				this.incomeForm = new FormGroup({
					incomes: this.fb.array([])
				});
			}

		}
		this.incomeForm.valueChanges.subscribe(val => {
			this.metadataService.updataUser(this.incomeForm.value);
		});
	}
	get IncomeFormObj(){
		return this.incomeForm.get("incomes") as FormArray
	}
}