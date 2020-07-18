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
	dayOfMonthItems: DayOfMonth[];
	
	  constructor(
		  private metadataService: MetadataService,
		  private fb: FormBuilder
		){
		this.dayOfMonthItems = this.metadataService.getDayOfMonth();
	}

	addOtherExpences(){
		const item = this.fb.group({
			title: "",
			amount:"",
			payDay: ""
		})
		this.otherExpencesForm.push(item);
	}
	removeOtherExpence(i){
		this.otherExpencesForm.removeAt(i)
	}

	ngOnInit(){
		this.expencesForm = new FormGroup({
			rent: new FormControl(""),
			rentpayDay: new FormControl(""),
			otherExpences: this.fb.array([])
		});
		
		this.expencesForm.valueChanges.subscribe(val => {
			this.metadataService.updateData(this.expencesForm.value);
		});
	}
	get otherExpencesForm(){
		return this.expencesForm.get("otherExpences") as FormArray
	}

}
