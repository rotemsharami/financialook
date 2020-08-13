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
	private user = new BehaviorSubject<any>({});
	cast = this.user.asObservable();
	// sendData(data: any){
	// 	let dataObject = {};
	// 	dataObject[Object.keys(data)[0]] = data[Object.keys(data)[0]];
	// 	this.subject.next(dataObject);
	// 	this.cookieServic.set("FL", JSON.stringify(dataObject));
	// }
	editUser(newUser){
		this.user.next(newUser);
	}
	clearData(data: any){
		//this.subject.next();
	}
    // getData(): Observable<any> {
    //     return this.subject.asObservable();
	// }
	constructor(
		private cookieServic: CookieService,
		
		) {
			//this.cookieServic.set("FL", "data");
			//let status = this.cookieServic.get("FL");
			//let status = this.cookieServic.check("FL");
			if(!this.cookieServic.check("FL")){
				/** New User */
				//this.subject.next({data: {}});

			}else{
				/** Existing User */
				this.user.next(JSON.parse(this.cookieServic.get("FL")));
				//this.subject.next({data: JSON.parse(this.cookieServic.get("FL"))});
			}
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
			{name: "Check", id: "4"},
		
		];
		return data;
	};

	updataUser(data){
		let dataObject = {};
		dataObject[Object.keys(data)[0]] = data[Object.keys(data)[0]];
		this.user.next(dataObject);
		this.cookieServic.set("FL", JSON.stringify(dataObject));
	}

	// updateData(data): void{
	// 	if(this.cookieServic.check("fl-data")){
	// 		var basicInfo = JSON.parse(this.cookieServic.get("fl-data"));
	// 		basicInfo[data.type] = data.data;
	// 	}else{
	// 		basicInfo = {};
	// 		basicInfo[data.type] = data.data;
	// 	}
	// 	this.cookieServic.set("fl-data", JSON.stringify(basicInfo));
	// }
	// getData2(){
	// 	if(this.cookieServic.check("fl-data")){
	// 		return JSON.parse(this.cookieServic.get("fl-data"));
	// 	}
	// 	else{
	// 		return false;
	// 	}
	// }
}