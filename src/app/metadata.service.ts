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
	castexpensesCounter = this.expensesCounter.asObservable();
	castProfit = this.profit.asObservable();
	editUser(newUser: any){
		this.data.next(newUser);
	}
	constructor(private cookieServic: CookieService) {
		if(this.cookieServic.check("FL")){
			console.log(JSON.parse(this.cookieServic.get("FL")));
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

	getMonths(): DayOfMonth[] {
		const data = [];
		for (var i = 1; i <= 12; i++) {
			data.push({name: i, id: i});
		}
		return data;
	};

	getYears(): DayOfMonth[] {
		let startingYear = new Date().getFullYear() - 25;
		const data = [];
		for (var i = startingYear; i <= (new Date().getFullYear() + 1); i++) {
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

	removeItemFromData(id: any){
		let newData = [];
		let dataObject = JSON.parse(this.cookieServic.get("FL"));
		dataObject["occasionalExpences"].forEach((item, index) => {
			if(item.id != id){
				newData.push(item);
			}
		});
		dataObject["occasionalExpences"] = newData;
		this.data.next(dataObject);
		this.cookieServic.set("FL", JSON.stringify(dataObject));
	}

	editItem(updatedItem){
		let newData = [];
		let dataObject = JSON.parse(this.cookieServic.get("FL"));
		dataObject["occasionalExpences"].forEach((item, index) => {
			if(item.id != updatedItem.id){
				newData.push(item);
			}else{
				newData.push(updatedItem);
			}
		});
		dataObject["occasionalExpences"] = newData;
		this.data.next(dataObject);
		this.cookieServic.set("FL", JSON.stringify(dataObject));
	}

	updataUser(data: any){
		let dataObject = {};
		if(this.cookieServic.check("FL")){
			dataObject = JSON.parse(this.cookieServic.get("FL"));
		}else{
			dataObject[data.key] = [];
		}
		let id = 0;
		if(dataObject[data.key].length > 0){
			id = parseInt(dataObject[data.key][dataObject[data.key].length-1]["id"])+1;
		}
		data.data.id = id;
		dataObject[data.key].push(data.data);
		this.data.next(dataObject);
		this.cookieServic.set("FL", JSON.stringify(dataObject));
	}

	updateCounters(){
		let sum = 0;
		if(this.data.value.incomes != undefined){
			this.data.value.incomes.forEach((item, index) => {
				let amount = parseInt(item.amount);
				if(!isNaN(amount)){
					sum += parseInt(item.amount);
				}
			});
			this.incomsCounter.next(sum);
			sum = 0;
			if(this.data.value.expences != undefined){
				this.data.value.expences.forEach((item, index) => {
					let amount = parseInt(item.amount);
					if(!isNaN(amount)){
						sum += parseInt(item.amount);
					}
				});
			}
			this.expensesCounter.next(sum);
			this.profit.next(this.incomsCounter.value - this.expensesCounter.value);
		}
	}
}