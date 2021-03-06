import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from "@angular/forms";
import { DayOfMonth } from '../interfaces/DayOfMonth';
import { MethodsofPayment } from '../interfaces/BasicInterfaceses';
import { MetadataService } from '../metadata.service';
@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
	occasionalExpencesForm: FormGroup;
	dayOfMonthItems: DayOfMonth[];
	months: DayOfMonth[];
	years: DayOfMonth[];
	methodsofPaymentItems: MethodsofPayment[];
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private metadataService: MetadataService,
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<DialogComponent>,
	) { 
		this.dayOfMonthItems = this.metadataService.getDayOfMonth();
		this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();
		this.months = this.metadataService.getMonths();
		this.years = this.metadataService.getYears();
	}
	paymentsChange(){
		let value = parseInt(this.occasionalExpencesForm.value.amount) / parseInt(this.occasionalExpencesForm.value.payments);
		console.log(value);
		let n = Math.round((value + Number.EPSILON) * 100) / 100;
		if(isNaN(n)){
			n = 0;
		}
		this.occasionalExpencesForm.controls.monthlyPayment.setValue(n);
	}


	methodsofPaymentChange(){
		switch(this.occasionalExpencesForm.value.methodsofPayment){
			case "2":
			case "3":
				this.occasionalExpencesForm.controls.payments.setValue("");
				this.occasionalExpencesForm.controls.firstPaymentMonth.setValue("");
				this.occasionalExpencesForm.controls.firstPaymentYear.setValue("");
				this.occasionalExpencesForm.controls.monthlyPayment.setValue("");
				break;
			case "4":
				this.occasionalExpencesForm.controls.payDay.setValue("");
				break;
		}
	}
	saveEditation(){
		this.dialogRef.close(this.occasionalExpencesForm.value);
	}

	addNewItem(){
		this.dialogRef.close(this.occasionalExpencesForm.value);
	}

	cancelEditation(){
		this.dialogRef.close();
	}
	ngOnInit(): void {
		let add = this.data.type == "add";
		this.occasionalExpencesForm = this.fb.group({
			title: [add ? "" : this.data.item.title, [Validators.required]],
			amount: [add ? "" : this.data.item.amount, [Validators.required]],
			payDay: [add ? "" : this.data.item.payDay, [Validators.required]],
			checkPayDay: [add ? "" : this.data.item.checkPayDay, [Validators.required]],
			payments: [add ? "" : this.data.item.payments, [Validators.required]],
			methodsofPayment: [add ? "" : this.data.item.methodsofPayment, [Validators.required]],
			monthlyPayment: [add ? "" : this.data.item.monthlyPayment, [Validators.required]],
			firstPaymentMonth: [add ? "" : this.data.item.firstPaymentMonth, [Validators.required]],
			firstPaymentYear: [add ? "" : this.data.item.firstPaymentYear, [Validators.required]],
		});
	}
	get occasionalExpencesFormObj(){
		return this.occasionalExpencesForm.get("occasionalExpences") as FormGroup
	}
}
