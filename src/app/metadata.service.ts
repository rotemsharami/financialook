import { Injectable } from '@angular/core';
import { DayOfMonth } from './interfaces/DayOfMonth';
import { MethodsofPayment } from './interfaces/BasicInterfaceses';
import { CookieService } from "ngx-cookie-service";

@Injectable({
	providedIn: 'root'
})
export class MetadataService {
	private cookieValue: String;
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


	updateData(data): void{
		if(this.cookieServic.check("fl-data")){
			var basicInfo = JSON.parse(this.cookieServic.get("fl-data"));
			basicInfo[data.type] = data.data;
		}else{
			basicInfo = {};
			basicInfo[data.type] = data.data;
		}
		this.cookieServic.set("fl-data", JSON.stringify(basicInfo));
	}
	getData(){
		if(this.cookieServic.check("fl-data")){
			return JSON.parse(this.cookieServic.get("fl-data"));
		}
		else{
			return false;
		}
	}
	
	constructor(private cookieServic: CookieService) {
		
	}
}
