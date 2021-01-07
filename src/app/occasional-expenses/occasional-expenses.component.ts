import {Component, OnInit, Inject} from "@angular/core";
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
	payDayCheck: string;
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
	dayOfMonthItems: DayOfMonth[];
	months: DayOfMonth[];
	years: DayOfMonth[];
	methodsofPaymentItems: MethodsofPayment[];
	constructor(
		private metadataService: MetadataService,
		public dialog: MatDialog,
		){
		this.methodsofPaymentItems = this.metadataService.getMethodsofPayment();
	}
	openDialog(row=null, type){
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

				case "add":
					if(result != undefined){
						this.metadataService.updataUser({key:"occasionalExpences", data: result});
						this.metadataService.updateCounters();
					}
					break;
			}
		})
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
	setMonthlyPayment(row){
		if(this.isPayments(row)){
			return row.monthlyPayment;
		}
		else{
			return "";
		}
	}
	setPaymentPeriod(row, type){
		let result = "";
		if(parseInt(row.payments) > 1){
			let firstPayment = moment(row.firstPaymentYear+"-"+row.firstPaymentMonth+"-"+"10");
			switch(type){
				case "first":
					result = firstPayment.format('DD/MM/YYYY');
					break;
				case "last":
					result = firstPayment.add(parseInt(row.payments)-1, 'M').format('DD/MM/YYYY');
					break;
			}
		}
		return result;
	}

	setpayedPayments(row){
		let result = "";
		switch(row.methodsofPayment){
			case "1":
			case "4":
				let payDay = row.payDayCheck;
				break;
		}


		
		if(parseInt(row.payments) > 1){
			let today = moment().format('DD');
			let payDay;
			switch(row.methodsofPayment){
				case "1":
					payDay = 10;
					break;
				case "4":
					payDay = row.payDayCheck;
					break;
			}
			let nextMonthPayDay = today <= payDay ? moment().format("MM") : moment().add(1, 'M').format('MM');
			let nextPayment = moment(moment().format("YYYY")+"-"+nextMonthPayDay+"-"+payDay);
		}
		return result;
	}

	setPayday(row){
		let result = "";
		if(parseInt(row.payments) > 1){
			let thisYear = moment().format("YYYY");
			let thisMonth = moment().format("MM");
			result = moment(thisYear+"-"+thisMonth+"-"+"10").format('DD/MM/YYYY');
		}
		else{
			//console.log(row.payDay);
			result = moment(row.payDay).format('DD/MM/YYYY');
		}
		return result;
	}
	isPayments(row){
		let result = false;
		if(parseInt(row.payments) > 1){
			result = true;
		}
		return result;
	}
	setPayed(row){
		let result;
		switch(row.methodsofPayment){
			case "2":
				break;
			case "3":
				break;
			case "1":
			case "4":
				if(parseInt(row.payments) > 1){
					switch(row.methodsofPayment){
						case "2":
							break;
					}					
					


					
			
					
					let payedPayments = parseInt(this.setPayments(row).split("/")[0]);
					result = payedPayments * parseInt(row.monthlyPayment);
				}

				break;


		}

		

		return result;
	}
	setbalanceOfPayment(row){
		let result;
		if(parseInt(row.payments) > 1){
			result = parseInt(row.amount) - this.setPayed(row);
		}
		return result;
	}
	setPayments(row){
		let result = "";
		if(parseInt(row.payments) > 1){
			let today = moment().format('DD/MM/YYYY');
			let thisYear = moment().format("YYYY");
			let thisMonth = moment().format("MM");
			let nextPayment = moment(thisYear+"-"+thisMonth+"-"+"10");
			let firstPayment = moment(row.firstPaymentYear+"-"+row.firstPaymentMonth+"-"+"10");
			let lastPayment = moment(firstPayment).add(parseInt(row.payments)-1, 'M').format('DD/MM/YYYY');
			if(moment().format('DD/MM/YYYY') > firstPayment.format('DD/MM/YYYY')){
				let payments = 1;
				// while(firstPayment.format('DD/MM/YYYY') < moment().format('DD/MM/YYYY')){
				// 	payments++;
				// 	firstPayment.add(1, "M");
				// }
				result = payments+"/"+row.payments;
				
			}
			else{
				result = row.payments+"/"+row.payments;
			}
		}
		return result;
	}

	editItem (row){
		this.dataSource.forEach((obj, index) => {
			delete obj ["showActions"];
		});
		row.showActions = true;
	}
	ngOnInit(){
		this.metadataService.cast.subscribe(user => this.dataSource = user.occasionalExpences);
		this.displayedColumns = ['payDay','title','amount','methodsofPayment', 'payments', 'payDayCheck', 'monthlyPayment', 'firstPayment', 'lastPayment', 'payed', 'payedPayments', 'balanceOfPayment', 'actions'];
	}
}