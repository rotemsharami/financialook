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
		const cookieExists = this.cookieServic.check("fl-data");
		const dataString = JSON.stringify(data);
		console.log(dataString);
		if(cookieExists){

		}
		
	}
	
	constructor(private cookieServic: CookieService) {
		
	}
}
