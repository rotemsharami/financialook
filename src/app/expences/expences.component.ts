import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";
import { DayOfMonth } from '../interfaces/DayOfMonth';
import { MetadataService } from '../metadata.service';

@Component({
  selector: 'app-expences',
  templateUrl: './expences.component.html',
  styleUrls: ['./expences.component.scss']
})

export class ExpencesComponent implements OnInit {
	expencesForm: FormGroup;
	dayOfMonth: DayOfMonth[];
	constructor(
		private metadataService: MetadataService,
		private fb: FormBuilder
		){
		this.dayOfMonth = this.metadataService.getDayOfMonth();
	}
	ngOnInit(){
		this.expencesForm = this.fb.group({
			rent: "",
			rentPayDay: '',
			propertyTax: '',
			propertyTaxPayDay: '',
			otherExpences: this.fb.array([])
	   });
	   
	   this.expencesForm.valueChanges.subscribe(console.log);
	}
	get otherExpencesForm(){
		return this.expencesForm.get("otherExpences") as FormArray
	}
	
	addOterExpences(){
		const item = this.fb.group({
			title:[],
			amount: [],
			payDay:[]
		})
		this.otherExpencesForm.push(item);
	}
	removeOterExpences(i){
		this.otherExpencesForm.removeAt(i);
	}

}
