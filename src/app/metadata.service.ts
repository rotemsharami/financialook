import { Injectable } from '@angular/core';
import { DayOfMonth } from './interfaces/DayOfMonth';
import { MethodsofPayment } from './interfaces/BasicInterfaceses';
import { CookieService } from "ngx-cookie-service";
import { Store, State } from '@ngrx/store';
import { Observable, Subject, BehaviorSubject } from "rxjs"
@Injectable({
	providedIn: 'root'
})
export class MetadataService {
	private cookieValue: String;
	public data = new BehaviorSubject<any>({});
	private incomsCounter = new BehaviorSubject<number>(0);
	private expensesCounter = new BehaviorSubject<number>(0);
	private profit = new BehaviorSubject<number>(0);
	cast = this.data.asObservable();
	castIncomsCounter = this.incomsCounter.asObservable();
	editUser(newUser: any){
		this.data.next(newUser);
	}
	constructor(private cookieServic: CookieService) {
		if(this.cookieServic.check("FL")){
			this.data.next(JSON.parse(this.cookieServic.get("FL")));
		}
		this.updateCounters();
	}
	getDayOfMonth(): DayOfMonth[] {
		const data = [];
		for (var i = 1; i <= 31; i++) {
			data.push({name: i, id: i});
		}
		return data;
	};
	getMethodsofPayment(): MethodsofPayment[] {
		const data = [
			{name: "Credit Card", id: "1"},
			{name: "Bank transfer", id: "2"},
			{name: "Cash", id: "3"},
			{name: "Check", id: "4"}
		];
		return data;
	};
	updataUser(data: any){
		let dataFromCookie = {};
		if(this.cookieServic.check("FL")){
			dataFromCookie = JSON.parse(this.cookieServic.get("FL"));
		}else{

		}
		dataFromCookie[Object.keys(data)[0]] = data[Object.keys(data)[0]];
		this.data.next(dataFromCookie);
		this.cookieServic.set("FL", JSON.stringify(dataFromCookie));

	}

	updateCounters(){
		let sum = 0;
		this.data._value.incomes.forEach((item, index) => {
			let amount = parseInt(item.amount);
			if(!isNaN(amount)){
				sum += parseInt(item.amount);
			}
		});
		this.incomsCounter.next(sum);
		// this.data._value.expences.forEach((item, index) => {
		// 	this.expensesCounter +=  parseInt(item.amount);
		// });
		// this.profit = this.incomsCounter - this.expensesCounter;

	}

}