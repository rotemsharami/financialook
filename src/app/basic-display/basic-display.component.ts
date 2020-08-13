import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as incomesActions from '../incomes/incomes.actions';
import Income  from '../incomes/incomes.model'
import incomesState, { initializeState } from '../incomes/incomes.state';
import { MetadataService } from '../metadata.service';
@Component({
	selector: 'app-basic-display',
	templateUrl: './basic-display.component.html',
	styleUrls: ['./basic-display.component.scss']
})
export class BasicDisplayComponent implements OnInit {
	data: any = {};
	user:any;
	subscription: Subscription;
	constructor(
		private usersService:MetadataService,
	private store: Store<{ incomes: incomesState }>,
	private messageService: MetadataService
	) {
		// this.subscription = this.messageService.getData().subscribe(data => {
			
		// 	if (data) {
		// 		this.data = data;
		// 	}
		// });
	}
	ngOnInit() {
		this.usersService.cast.subscribe(user=> this.user = user);
	}
}