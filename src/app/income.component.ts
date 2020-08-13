import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DayOfMonth } from './interfaces/DayOfMonth';
import { MethodsofPayment } from './interfaces/BasicInterfaceses';
import { MetadataService } from './metadata.service';
import { Observable, Subscription } from 'rxjs';


@Component({
    selector: 'Income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit{

	user:any;
	editUser:string;


    incomeForm: FormGroup;
	dayOfMonthItems: DayOfMonth[];
	methodsofPaymentItems: MethodsofPayment[];
	data: any = {};
	subscription: Subscription;
	constructor(
			private usersService:MetadataService,
			private metadataService: MetadataService,
			private fb: FormBuilder,
		){
			this.dayOfMonthItems = this.metadataService.getDayOfMonth();
			this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();

			// this.subscription = this.metadataService.getData().subscribe(data => {
			// 	console.log(data);
			// 	this.data = data;
			// });

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

	editTheUser(){
		this.usersService.editUser(this.editUser);
	}

	ngOnInit(){
		this.usersService.cast.subscribe(user=> this.user = user);
		if(this.user != undefined){
		if(this.user.incomes != undefined){
			this.incomeForm = new FormGroup({
				incomes: this.fb.array([])
			});
			if(this.user.incomes != undefined){
				if(this.user.incomes.length > 0){
					this.user.incomes.forEach((obj, index) => {
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
		}else{
			this.incomeForm = new FormGroup({
				incomes: this.fb.array([])
			});
		}

		// this.incomeForm = new FormGroup({
		// 	incomes: this.fb.array([])
		// });


		this.incomeForm.valueChanges.subscribe(val => {
			this.usersService.updataUser(this.incomeForm.value);
		});
	}
	get IncomeFormObj(){
		return this.incomeForm.get("incomes") as FormArray
	}
}