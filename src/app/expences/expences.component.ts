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
	expencesForm: FormGroup;
	rent: FormControl;
	dayOfMonth: DayOfMonth[];
  	constructor(private metadataService: MetadataService){
		this.dayOfMonth = this.metadataService.getDayOfMonth();
	}
	ngOnInit(){
		this.expencesForm = new FormGroup({
			rent: new FormControl(),
			rentPayDay: new FormControl()
	   });		
	}

}
