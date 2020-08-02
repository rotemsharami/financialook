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
    incomeForm: FormGroup;
	dayOfMonthItems: DayOfMonth[];
	methodsofPaymentItems: MethodsofPayment[];
	
	fLdata: any;
	  constructor(
		  private metadataService: MetadataService,
		  private fb: FormBuilder
		){
		this.dayOfMonthItems = this.metadataService.getDayOfMonth();
		this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();
		this.fLdata = this.metadataService.getData();
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
		this.fLdata = this.metadataService.getData();
		//console.log(this.fLdata);
		if(this.fLdata.income != undefined){
			this.incomeForm = new FormGroup({
				incomes: this.fb.array([])
			});
			if(this.fLdata.income != undefined){
				if(this.fLdata.income.incomes.length > 0){
					this.fLdata.income.incomes.forEach((obj, index) => {
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
		}else{
			this.incomeForm = new FormGroup({
				incomes: this.fb.array([])
			});
		}

		
		
		this.incomeForm.valueChanges.subscribe(val => {
			// this.metadataService.updateDataSource({type: "income", data: this.incomeForm.value});
			//this.metadataService.updateData({type: "income", data: this.incomeForm.value});
			console.log( this.incomeForm.value);
			this.fLdata.income = this.incomeForm.value;
		});
	}
	get IncomeFormObj(){
		return this.incomeForm.get("incomes") as FormArray
	}
}