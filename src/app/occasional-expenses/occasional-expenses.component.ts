import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DayOfMonth } from '../interfaces/DayOfMonth';
import { MethodsofPayment } from '../interfaces/BasicInterfaceses';
import { MetadataService } from '../metadata.service';

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
	methodsofPaymentItems: MethodsofPayment[];
	constructor(
		private metadataService: MetadataService,
		private fb: FormBuilder){
		this.dayOfMonthItems = this.metadataService.getDayOfMonth();
		this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();
	}

	paymentsChange(i){

		
		

		this.occasionalExpencesFormObj.controls[0].controls.monthlyPayment.setValue(Math.round(
			parseInt(this.occasionalExpencesFormObj.controls[0].controls.amount.value)/parseInt(this.occasionalExpencesFormObj.controls[0].controls.payments.value)
		)
		);
	}

	addExpense(){
		const item = this.fb.group({
			title: "",
			amount:"",
			payDay: "",
			methodsofPayment: "",
			payments:"",
			monthlyPayment: ""
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
								payDay: obj.payDay,
								methodsofPayment: obj.methodsofPayment,
								payments: obj.payments,
								monthlyPayment: obj.monthlyPayment,
							})
							this.occasionalExpencesFormObj.push(item);
						});
					}
				}
			}
		}else{
			this.occasionalExpencesForm = new FormGroup({
				occasionalExpences: this.fb.array([])
			});
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
