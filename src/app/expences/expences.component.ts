import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DayOfMonth } from '../interfaces/DayOfMonth';
import { MethodsofPayment } from '../interfaces/BasicInterfaceses';
import { MetadataService } from '../metadata.service';
@Component({
  selector: 'app-expences',
  templateUrl: './expences.component.html',
  styleUrls: ['./expences.component.scss']
})
export class ExpencesComponent implements OnInit {
	data:any;
	newData:any;
	expencesForm: FormGroup;
	dayOfMonthItems: DayOfMonth[];
	methodsofPaymentItems: MethodsofPayment[];
	constructor(
		private metadataService: MetadataService,
		private fb: FormBuilder){
		this.dayOfMonthItems = this.metadataService.getDayOfMonth();
		this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();
	}
	addExpense(){
		const item = this.fb.group({
			title: "",
			amount:"",
			payDay: "",
			methodsofPayment: ""
		})
		this.expencesFormObj.push(item);
	}
	removeExpense(i){
		this.expencesFormObj.removeAt(i)
	}
	ngOnInit(){
		this.metadataService.cast.subscribe(user=> this.data = user);
		if(this.data != undefined){
			if(this.data.incomes != undefined){
				this.expencesForm = new FormGroup({
					expences: this.fb.array([])
				});
				if(this.data.expences != undefined){
					if(this.data.expences.length > 0){
						this.data.expences.forEach((obj, index) => {
							const item = this.fb.group({
								title: obj.title,
								amount: obj.amount,
								payDay: obj.payDay,
								methodsofPayment: obj.methodsofPayment
							})
							this.expencesFormObj.push(item);
						});
					}
				}
			}
		}else{
			this.expencesForm = new FormGroup({
				expences: this.fb.array([])
			});
		}
		this.expencesForm.valueChanges.subscribe(val => {
			this.metadataService.updataUser(this.expencesForm.value);
		});
	}
	get expencesFormObj(){
		return this.expencesForm.get("expences") as FormArray
	}
}