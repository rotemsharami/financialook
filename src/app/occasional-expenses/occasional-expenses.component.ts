import { YearMonthFormatDirective } from '../directives/year-month-format.directive';
import { DateFormatDirective } from '../directives/date-format.directive';
import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DayOfMonth } from '../interfaces/DayOfMonth';
import { MethodsofPayment } from '../interfaces/BasicInterfaceses';
import { MetadataService } from '../metadata.service';

import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;
// export const MY_FORMATS = {
// 	parse: {
// 	  dateInput: 'MM/YYYY',
// 	},
// 	display: {
// 	  dateInput: 'MM/YYYY',
// 	  monthYearLabel: 'MMM YYYY',
// 	  dateA11yLabel: 'LL',
// 	  monthYearA11yLabel: 'MMMM YYYY',
// 	},
//   };




@Component({
  selector: 'app-occasional-expenses',
  templateUrl: './occasional-expenses.component.html',
  styleUrls: ['./occasional-expenses.component.scss']
})
export class OccasionalExpensesComponent implements OnInit {
	//firstPayment = new FormControl(moment());
	dateClass = (d: Date): MatCalendarCellCssClasses => {
		const fullDate = d.getDate();
		return (fullDate === 1 || fullDate === 20) ? 'example-custom-date-class' : '';
	}
	data:any;
	newData:any;
	occasionalExpencesForm: FormGroup;
	dayOfMonthItems: DayOfMonth[];
	months: DayOfMonth[];
	years: DayOfMonth[];
	moment_obj: MatMomentDateModule;
	methodsofPaymentItems: MethodsofPayment[];
	constructor(
		private metadataService: MetadataService,
		private fb: FormBuilder){
		this.dayOfMonthItems = this.metadataService.getDayOfMonth();
		this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();
		this.months = this.metadataService.getMonths();
		this.years = this.metadataService.getYears();
	}

	paymentsChange(i){
		//this.occasionalExpencesFormObj.controls[i].controls.monthlyPayment.setValue(Math.round(parseInt(this.occasionalExpencesFormObj.controls[i].controls.amount.value)/parseInt(this.occasionalExpencesFormObj.controls[i].controls.payments.value)));
		//console.log(this.occasionalExpencesFormObj.controls);
	}

	chosenYearHandler(normalizedYear: Moment, i) {
		let m = moment();
		m.year(normalizedYear.year());
		this.occasionalExpencesFormObj.controls[i].controls.firstPayment.setValue(m);
	}
	
	chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, i) {
		let m =  moment(this.occasionalExpencesForm.value.occasionalExpences[i].firstPayments);
		m.month(normalizedMonth.month());
		this.occasionalExpencesFormObj.controls[i].controls.firstPayment.setValue(m);
		datepicker.close();
	}

	addExpense(){
		const item = this.fb.group({
			title: "",
			amount:"",
			payDay: "",
			methodsofPayment: "",
			payments:"",
			monthlyPayment: "",
			firstPayment: ""
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
			if(this.data.incomes != undefined){
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
								startingMonth: obj.startingMonth,
								startingYear: obj.startingYear,
								firstPayment: obj.firstPayment
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
