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
	incomsCounter: number;
	expensesCounter: number;
	profit: number;
	constructor(private usersService:MetadataService) {
		

		
	}
	ngOnInit() {
		this.usersService.cast.subscribe(data => this.data = data);
		this.usersService.castIncomsCounter.subscribe(incomsCounter => this.incomsCounter = incomsCounter);
	}
}