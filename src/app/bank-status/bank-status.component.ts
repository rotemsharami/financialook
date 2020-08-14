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
	constructor(private dataService:MetadataService) {
		this.transactions = [];
	}
	ngOnInit(): void {
		this.dataService.cast.subscribe(data => this.data = data);
		this.data.expences.forEach((item, index) => {
			this.transactions.push({
				"amount": item.amount,
				"date": item.payDay,
				"title": item.title
			})
		});
		console.log(this.transactions);
		console.log(this.data);


		
	}
}
