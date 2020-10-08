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
		let n = Math.round((value + Number.EPSILON) * 100) / 100;
		if(isNaN(n)){
			n = 0;
		}
		this.occasionalExpencesForm.controls.monthlyPayment.setValue(n);
  }
  saveEditation(){
    this.dialogRef.close(this.occasionalExpencesForm.value);
  }
  cancelEditation(){
    this.dialogRef.close();
  }
  ngOnInit(): void {
		this.occasionalExpencesForm = this.fb.group({
			title: [this.data.item.title, [Validators.required]],
			amount: [this.data.item.amount, [Validators.required]],
			payDay: this.data.item.payDay,
			methodsofPayment: [this.data.item.methodsofPayment, [Validators.required]],
			payments:this.data.item.payments,
			monthlyPayment: this.data.item.monthlyPayment,
			firstPaymentMonth: this.data.item.firstPaymentMonth,
			firstPaymentYear: this.data.item.firstPaymentYear
		});
  }
	get occasionalExpencesFormObj(){
		return this.occasionalExpencesForm.get("occasionalExpences") as FormGroup
	}
}
