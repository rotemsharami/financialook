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
			dayOfmonth: ""
		})
		this.otherExpencesForm.push(item);
	}
	removeOtherExpence(i){
		this.otherExpencesForm.removeAt(i)
	}

	ngOnInit(){
		this.expencesForm = new FormGroup({
			otherExpences: this.fb.array([])
		})
	}
	get otherExpencesForm(){
		return this.expencesForm.get("otherExpences") as FormArray
	}

}
