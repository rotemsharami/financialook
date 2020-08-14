import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../metadata.service';
@Component({
	selector: 'app-basic-display',
	templateUrl: './basic-display.component.html',
	styleUrls: ['./basic-display.component.scss']
})
export class BasicDisplayComponent implements OnInit {
	data: any;
	incomsCounter: number;
	expensesCounter: number;
	profit: number;
	constructor(private usersService:MetadataService) {}
	ngOnInit() {
		this.usersService.cast.subscribe(data => this.data = data);
		this.usersService.castIncomsCounter.subscribe(incomsCounter => this.incomsCounter = incomsCounter);
		this.usersService.castexpensesCounter.subscribe(expensesCounter => this.expensesCounter = expensesCounter);
		this.usersService.castProfit.subscribe(profit => this.profit = profit);
	}
}