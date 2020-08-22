import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../metadata.service';
@Component({
	selector: 'app-bank-status',
	templateUrl: './bank-status.component.html',
	styleUrls: ['./bank-status.component.scss']
})
export class BankStatusComponent implements OnInit {
	data: any;
	transactions: any;
	currentBankStatus: number;
	constructor(private dataService:MetadataService) {
		this.transactions = [];
		this.currentBankStatus = -5000;
	}
	ngOnInit(): void {
		this.dataService.cast.subscribe(data => this.data = data);
		this.data.expences.forEach((item, index) => {
			var d = new Date();
			var n = d.getMonth()+1;
			var y = d.getUTCFullYear();
			this.transactions.push({
				"amount": item.amount,
				"date": item.payDay+"/"+n+"/"+y,
				"title": item.title
			})
		});
		console.log(this.transactions);
		console.log(this.data);
		this.transactions.sort((a, b) => (a.date > b.date) ? 1 : -1);
		let sum = this.currentBankStatus;
		this.transactions.forEach((item, index) => {
			sum -= parseInt(item.amount);
			item.status = sum;
		});
	}
}
