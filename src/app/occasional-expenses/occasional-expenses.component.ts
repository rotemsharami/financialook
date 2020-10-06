import {Component, OnInit, Directive} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from "@angular/forms";
import { DayOfMonth } from '../interfaces/DayOfMonth';
import { MethodsofPayment } from '../interfaces/BasicInterfaceses';
import { MetadataService } from '../metadata.service';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';


// export interface OccasionalExpensesItem{
// 	title: string;
// 	amount: string;
// 	payDay: string;
// 	methodsofPayment: string;
// 	payments: string;
// 	monthlyPayment: string;
// 	firstPaymentMonth: string;
// 	firstPaymentYear: string;
// }

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}




@Component({
  selector: 'app-occasional-expenses',
  templateUrl: './occasional-expenses.component.html',
  styleUrls: ['./occasional-expenses.component.scss']
})

export class OccasionalExpensesComponent implements OnInit {

	displayedColumns: string[];
	dataSource: PeriodicElement[];



	//dataSource = ELEMENT_DATA;


	//data:OccasionalExpensesItem[];
	//displayedColumns: string[];
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

	paymentsChange(){
		let value = parseInt(this.occasionalExpencesForm.value.amount) / parseInt(this.occasionalExpencesForm.value.payments);
		let n = Math.round((value + Number.EPSILON) * 100) / 100;
		if(isNaN(n)){
			n = 0;
		}
		this.occasionalExpencesForm.controls.monthlyPayment.setValue(n);
	}

	addExpense(){

	}
  
  	whatsThis(object){
    	console.log(object);
	  }
	  


	  
	onSubmit(formValues) {
		console.log(formValues);

		this.metadataService.updataUser({key:"occasionalExpences", data: formValues.value});
		this.metadataService.updateCounters();


	}

	ngOnInit(){

		this.occasionalExpencesForm = this.fb.group({
			title: ["", [Validators.required]],
			amount: ["", [Validators.required]],
			payDay: "",
			methodsofPayment: ["", [Validators.required]],
			payments:"",
			monthlyPayment: "",
			firstPaymentMonth: "",
			firstPaymentYear: ""
		});


		

		this.occasionalExpencesForm.get('methodsofPayment').valueChanges
		.subscribe(value => {
			if(value == "1"){
				console.log("yes");
				this.occasionalExpencesForm.get('payments').setValidators(Validators.required);
				this.occasionalExpencesForm.get('firstPaymentMonth').setValidators(Validators.required);
				this.occasionalExpencesForm.get('firstPaymentYear').setValidators(Validators.required);
				this.occasionalExpencesForm.get('payDay').clearValidators();
			}else{
				console.log("no");
				this.occasionalExpencesForm.get('payments').clearValidators();
				this.occasionalExpencesForm.get('firstPaymentMonth').clearValidators();
				this.occasionalExpencesForm.get('firstPaymentYear').clearValidators();
				this.occasionalExpencesForm.get('payDay').setValidators(Validators.required);
			}
					
		//   if(value) {
		// 	this.myForm.get('myEmailField').setValidators(this.emailValidators.concat(Validators.required))
		//   } else {
		// 	this.myForm.get('myEmailField').setValidators(this.emailValidators);
		//   }
		});


		

		this.metadataService.cast.subscribe(user => this.dataSource = user.occasionalExpences);
		//this.dataSource = this.;
		this.displayedColumns = ['title','amount','payDay','methodsofPayment','payments','monthlyPayment','firstPaymentMonth','firstPaymentYear'];
		//this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
		console.log(this.dataSource);
		// this.dataSource = [
		// 	{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
		// 	{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
		// 	{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
		// 	{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
		// 	{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
		// 	{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
		// 	{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
		// 	{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
		// 	{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
		// 	{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
		// ];

		console.log(this.dataSource);




		


		// if(this.data != undefined){
		// 	if(this.data.occasionalExpences != undefined){
		// 		this.occasionalExpencesForm = new FormGroup({
		// 			occasionalExpences: this.fb.array([])
		// 		});
		// 		if(this.data.occasionalExpences != undefined){
		// 			if(this.data.occasionalExpences.length > 0){
		// 				this.data.occasionalExpences.forEach((obj, index) => {
		// 					const item = this.fb.group({
		// 						title: obj.title,
		// 						amount: obj.amount,
		// 						payDay: new Date(obj.payDay),
		// 						methodsofPayment: obj.methodsofPayment,
		// 						payments: obj.payments,
		// 						monthlyPayment: obj.monthlyPayment,
		// 						firstPaymentMonth: obj.firstPaymentMonth,
		// 						firstPaymentYear: obj.firstPaymentYear,
		// 					})
		// 					this.occasionalExpencesFormObj.push(item);
		// 				});
		// 			}
		// 		}
		// 	}else{
		// 		this.occasionalExpencesForm = new FormGroup({
		// 			occasionalExpences: this.fb.array([])
		// 		});
		// 	}
		// }

		// this.occasionalExpencesForm.valueChanges.subscribe(val => {
		// 	this.metadataService.updataUser(this.occasionalExpencesForm.value);
		// 	this.metadataService.updateCounters();
		// });




		
	}
	get occasionalExpencesFormObj(){
		return this.occasionalExpencesForm.get("occasionalExpences") as FormGroup
	}
}