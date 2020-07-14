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
	get otherExpences(){
		return this.expencesForm.get("otherExpences") as FormArray;
	}

	addOtherExpences(){
		this.otherExpences.push(this.fb.control(""));
	}

	ngOnInit(){
		this.expencesForm = new FormGroup({
			rent: new FormControl(),
			rentPayDay: new FormControl(),
			propertyTax: new FormControl(),
			propertyTaxPayDay: new FormControl(),
			otherExpences: this.fb.array([])
	   });		
	}

}
