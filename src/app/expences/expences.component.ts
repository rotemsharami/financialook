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
<<<<<<< HEAD
	dayOfMonth: DayOfMonth[];
	constructor(
		private metadataService: MetadataService,
		private fb: FormBuilder
=======
	dayOfMonthItems: DayOfMonth[];
	methodsofPaymentItems: MethodsofPayment[];
	  constructor(
		  private metadataService: MetadataService,
		  private fb: FormBuilder
>>>>>>> eeb39643825bcb67cc23001d75a8c825fcc05ffe
		){
		this.dayOfMonthItems = this.metadataService.getDayOfMonth();
		this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();
	}
<<<<<<< HEAD
	ngOnInit(){
		this.expencesForm = this.fb.group({
			rent: "",
			rentPayDay: '',
			propertyTax: '',
			propertyTaxPayDay: '',
			otherExpences: this.fb.array([])
	   });
	   
	   this.expencesForm.valueChanges.subscribe(console.log);
	}
	get otherExpencesForm(){
		return this.expencesForm.get("otherExpences") as FormArray
	}
	
	addOterExpences(){
		const item = this.fb.group({
			title:[],
			amount: [],
			payDay:[]
		})
		this.otherExpencesForm.push(item);
	}
	removeOterExpences(i){
		this.otherExpencesForm.removeAt(i);
=======
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
		if(data.expences != undefined){
			this.expencesForm = new FormGroup({
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
				otherExpences: this.fb.array([])
			});
		}
		this.expencesForm.valueChanges.subscribe(val => {
			this.metadataService.updateData({type: "expences", data: this.expencesForm.value});
		});
	}
	get otherExpencesForm(){
		return this.expencesForm.get("otherExpences") as FormArray
>>>>>>> eeb39643825bcb67cc23001d75a8c825fcc05ffe
	}
}