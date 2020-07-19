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
	expencesForm: FormGroup;
	dayOfMonthItems: DayOfMonth[];
	methodsofPaymentItems: MethodsofPayment[];
	  constructor(
		  private metadataService: MetadataService,
		  private fb: FormBuilder
		){
		this.dayOfMonthItems = this.metadataService.getDayOfMonth();
		this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();
	}
	addOtherExpences(){
		const item = this.fb.group({
			title: "",
			amount:"",
			payDay: "",
			methodsofPayment: ""
		})
		this.otherExpencesForm.push(item);
	}
	removeOtherExpence(i){
		this.otherExpencesForm.removeAt(i)
	}
	ngOnInit(){
		const data = this.metadataService.getData();
		var rentcurrentValue = "";
		var rentpayDayValue = "";
		if(data.expences != undefined){
			console.log(data);
			rentcurrentValue = data.expences.rent;
			rentpayDayValue = data.expences.rentpayDay;
			this.expencesForm = new FormGroup({
				rent: new FormControl(rentcurrentValue),
				rentpayDay: new FormControl(rentpayDayValue),
				otherExpences: this.fb.array([])
			});
			if(data.expences != undefined){
				if(data.expences.otherExpences.length > 0){
					data.expences.otherExpences.forEach((obj, index) => {
						const item = this.fb.group({
							title: obj.title,
							amount: obj.amount,
							payDay: obj.payDay,
							methodsofPayment: obj.methodsofPayment
						})
						this.otherExpencesForm.push(item);
					});
				}
			}
		}else{
			this.expencesForm = new FormGroup({
				rent: new FormControl(rentcurrentValue),
				rentpayDay: new FormControl(rentpayDayValue),
				otherExpences: this.fb.array([])
			});
		}
		this.expencesForm.valueChanges.subscribe(val => {
			this.metadataService.updateData({type: "expences", data: this.expencesForm.value});
		});
	}
	get otherExpencesForm(){
		return this.expencesForm.get("otherExpences") as FormArray
	}
}