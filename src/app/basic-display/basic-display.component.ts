import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../metadata.service';
@Component({
  selector: 'app-basic-display',
  templateUrl: './basic-display.component.html',
  styleUrls: ['./basic-display.component.scss']
})
export class BasicDisplayComponent implements OnInit {
  fLdata: any;
  monthlyIncome: number;
  constructor(private metadataService: MetadataService) {
	this.fLdata = this.metadataService.getData();
	this.monthlyIncome = 0;
  }

  ngOnInit(): void {
    
    if(this.fLdata.income != undefined){
		if(this.fLdata.income.incomes != undefined){
			this.fLdata.income.incomes.forEach((obj, index) => {
				this.monthlyIncome += parseInt(obj.amount)
			});
		}
    }
  }
}
