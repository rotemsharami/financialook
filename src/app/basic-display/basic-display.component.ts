import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as incomesActions from '../incomes/incomes.actions';
import { MetadataService } from '../metadata.service';
@Component({
	selector: 'app-basic-display',
	templateUrl: './basic-display.component.html',
	styleUrls: ['./basic-display.component.scss']
})
export class BasicDisplayComponent implements OnInit {
	data:any;
	subscription: Subscription;
	incomsCounter: number = 0;
	expensesCounter: number = 0;
	profit: number = 0;
	constructor(private usersService:MetadataService) {}
	ngOnInit() {
		this.usersService.cast.subscribe(data => this.data = data);
		this.data.incomes.forEach((item, index) => {
			this.incomsCounter +=  parseInt(item.amount);
		});
		this.data.expences.forEach((item, index) => {
			this.expensesCounter +=  parseInt(item.amount);
		});
		this.profit = this.incomsCounter - this.expensesCounter;
	}
}