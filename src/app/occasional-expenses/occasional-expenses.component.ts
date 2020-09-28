import {Component, OnInit, Directive} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DayOfMonth } from '../interfaces/DayOfMonth';
import { MethodsofPayment } from '../interfaces/BasicInterfaceses';
import { MetadataService } from '../metadata.service';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';

@Component({
  selector: 'app-occasional-expenses',
  templateUrl: './occasional-expenses.component.html',
  styleUrls: ['./occasional-expenses.component.scss']
})
export class OccasionalExpensesComponent implements OnInit {
	data:any;
	newData:any;
	occasionalExpencesForm: FormGroup;
	dayOfMonthItems: DayOfMonth[];
	months: DayOfMonth[];
	years: DayOfMonth[];
	methodsofPaymentItems: MethodsofPayment[];
	constructor(
		private metadataService: MetadataService,
		private fb: FormBuilder){
		this.dayOfMonthItems = this.metadataService.getDayOfMonth();
		this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();
		this.months = this.metadataService.getMonths();
		this.years = this.metadataService.getYears();
	}

	paymentsChange(i: number){
		let value = parseInt(this.occasionalExpencesFormObj.controls[i]["controls"].amount.value) / parseInt(this.occasionalExpencesFormObj.controls[i]["controls"].payments.value);
		let n = Math.round((value + Number.EPSILON) * 100) / 100;
		
		this.occasionalExpencesFormObj.controls[i]["controls"].monthlyPayment.setValue(n);
	}

	addExpense(){
		const item = this.fb.group({
			title: "",
			amount:"",
			payDay: "",
			methodsofPayment: "",
			payments:"",
			monthlyPayment: "",
			firstPaymentMonth: "",
			firstPaymentYear: ""
		})
		this.occasionalExpencesFormObj.push(item);
	}
	removeExpense(i){
		this.occasionalExpencesFormObj.removeAt(i)
  	}
  
  	whatsThis(object){
    	console.log(object);
  	}

  	getValue(mtop, id){
		if(mtop == "1"){
			return "";
		}else{
			return id;
		}
  	}

	ngOnInit(){
		this.metadataService.cast.subscribe(user=> this.data = user);
		if(this.data != undefined){
			if(this.data.occasionalExpences != undefined){
				this.occasionalExpencesForm = new FormGroup({
					occasionalExpences: this.fb.array([])
				});
				if(this.data.occasionalExpences != undefined){
					if(this.data.occasionalExpences.length > 0){
						this.data.occasionalExpences.forEach((obj, index) => {
							const item = this.fb.group({
								title: obj.title,
								amount: obj.amount,
								payDay: new Date(obj.payDay),
								methodsofPayment: obj.methodsofPayment,
								payments: obj.payments,
								monthlyPayment: obj.monthlyPayment,
								firstPaymentMonth: obj.firstPaymentMonth,
								firstPaymentYear: obj.firstPaymentYear,
							})
							this.occasionalExpencesFormObj.push(item);
						});
					}
				}
			}else{
				this.occasionalExpencesForm = new FormGroup({
					occasionalExpences: this.fb.array([])
				});
			}
		}
		this.occasionalExpencesForm.valueChanges.subscribe(val => {
			this.metadataService.updataUser(this.occasionalExpencesForm.value);
			this.metadataService.updateCounters();
		});
		
	}
	get occasionalExpencesFormObj(){
		return this.occasionalExpencesForm.get("occasionalExpences") as FormArray
	}
}