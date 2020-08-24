import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../metadata.service';
import * as moment from 'moment';
@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {
	data: any;
	transactions: any;
  constructor(private dataService:MetadataService) {
    this.transactions = [];
  }

	ngOnInit(): void {
		let now = moment();

		console.log(now);

		this.dataService.cast.subscribe(data => this.data = data);
		Object.keys(this.data).forEach((index) => {
			console.log(index);
			if(index == "expences" || index == "occasionalExpences"){
				this.data[index].forEach((item, index) => {
					if(item.methodsofPayment == "1"){
						var d = new Date();
						var n = d.getMonth()+1;
						var y = d.getUTCFullYear();
						this.transactions.push({
							"amount": item.amount,
							"date": item.payDay+"/"+n+"/"+y,
							"title": item.title
						});
					}
					
				});
			}
			
      
      /*

			var d = new Date();
			var n = d.getMonth()+1;
			var y = d.getUTCFullYear();
			this.transactions.push({
				"amount": item.amount,
				"date": item.payDay+"/"+n+"/"+y,
				"title": item.title
      });
      */

    });
    


    
		console.log(this.transactions);
		// console.log(this.data);
		// this.transactions.sort((a, b) => (a.date > b.date) ? 1 : -1);
		// let sum = this.currentBankStatus;
		// this.transactions.forEach((item, index) => {
		// 	sum -= parseInt(item.amount);
		// 	item.status = sum;
		// });
	}

}
