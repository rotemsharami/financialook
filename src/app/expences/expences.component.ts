import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import { DayOfMonth } from '../interfaces/DayOfMonth';
import { MetadataService } from '../metadata.service';

@Component({
  selector: 'app-expences',
  templateUrl: './expences.component.html',
  styleUrls: ['./expences.component.scss']
})
export class ExpencesComponent implements OnInit {

	
	expencesForm = new FormGroup({
		rentFormControl: new FormControl(),
		rentPayDayFormControl: new FormControl()
   });



	dayOfMonth: DayOfMonth[];
  	constructor(private metadataService: MetadataService){
		this.dayOfMonth = this.metadataService.getDayOfMonth();
	}
  ngOnInit(){
	  
  }

}
