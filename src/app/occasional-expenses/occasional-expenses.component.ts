import {Component, OnInit, Inject} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from "@angular/forms";
import { DayOfMonth } from '../interfaces/DayOfMonth';
import { MethodsofPayment } from '../interfaces/BasicInterfaceses';
import { MetadataService } from '../metadata.service';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
export interface OccasionalExpensesItem{
	title: string;
	amount: string;
	payDay: string;
	methodsofPayment: string;
	payments: string;
	monthlyPayment: string;
	firstPaymentMonth: string;
	firstPaymentYear: string;
}
@Component({
  selector: 'app-occasional-expenses',
  templateUrl: './occasional-expenses.component.html',
  styleUrls: ['./occasional-expenses.component.scss']
})
export class OccasionalExpensesComponent implements OnInit {
	displayedColumns: string[];
	dataSource: OccasionalExpensesItem[];
	newData:any;
	occasionalExpencesForm: FormGroup;
	dayOfMonthItems: DayOfMonth[];
	months: DayOfMonth[];
	years: DayOfMonth[];
	methodsofPaymentItems: MethodsofPayment[];
	constructor(
		private metadataService: MetadataService,
		private fb: FormBuilder,
		public dialog: MatDialog,
		//private dialogReff: MatDialogRef<DialogComponent>,
		){
		this.dayOfMonthItems = this.metadataService.getDayOfMonth();
		this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();
		this.months = this.metadataService.getMonths();
		this.years = this.metadataService.getYears();
	}
	openDialog(row, type){
		let dialogRef = this.dialog.open(DialogComponent, {data: {item: row, type: type}});
		dialogRef.afterClosed().subscribe(result => {
			switch(type){
				case "edit":
					if(result != undefined){
						result.id = row.id;
						this.metadataService.editItem(result);
					}
					break;
				case "remove":
					if(result == "true"){
						this.metadataService.removeItemFromData(row.id);
					}
					break;
			}
		})
	}
	paymentsChange(){
		let value = parseInt(this.occasionalExpencesForm.value.amount) / parseInt(this.occasionalExpencesForm.value.payments);
		let n = Math.round((value + Number.EPSILON) * 100) / 100;
		if(isNaN(n)){
			n = 0;
		}
		this.occasionalExpencesForm.controls.monthlyPayment.setValue(n);
	}
	showHideActions(row){
		return row.showActions != undefined;
	}

	setDate(date){
		return moment(date).format('DD/MM/YYYY');
	}
	setMethodsofPayment(id){
		let result = "";
		this.methodsofPaymentItems.forEach((obj, index) => {
			if(obj.id === id)
				result = obj.name;
		});
		return result;
	}
	editItem (row){
		this.dataSource.forEach((obj, index) => {
			delete obj ["showActions"];
		});
		row.showActions = true;
	}
	onSubmit(formValues) {
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
		});
		this.metadataService.cast.subscribe(user => this.dataSource = user.occasionalExpences);
		this.displayedColumns = ['payDay','title','amount','methodsofPayment','payments','monthlyPayment','firstPayment', 'monthlyPayment', 'actions'];
	}
	get occasionalExpencesFormObj(){
		return this.occasionalExpencesForm.get("occasionalExpences") as FormGroup
	}
}