import { Injectable } from '@angular/core';
import { DayOfMonth } from './interfaces/DayOfMonth';
import { CookieService } from "ngx-cookie-service";

@Injectable({
	providedIn: 'root'
})
export class MetadataService {
	private cookieValue: String;
	getDayOfMonth(): DayOfMonth[] {
		return [
			{name: '1', id: '1'},
			{name: '2', id: '2'},
			{name: '3', id: '3'}
		]
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
