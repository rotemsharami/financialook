import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../metadata.service';
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Income } from 'src/incomes/income';
import { State } from "../reducers/incomes.reducer"

@Component({
  selector: 'app-basic-display',
  templateUrl: './basic-display.component.html',
  styleUrls: ['./basic-display.component.scss']
})
export class BasicDisplayComponent implements OnInit {
  incomes$: Observable<any[]> = this._store$.pipe(
    select("incomes")
  )
  // fLdata: any;
  // monthlyIncome: number;
  constructor(
    private metadataService: MetadataService,
    private _store$: Store<State>
    ) {
	// this.fLdata = this.metadataService.getData();
	// this.monthlyIncome = 0;
  }

  ngOnInit(): void {
    console.log(this.incomes$);
    // if(this.fLdata.income != undefined){
    //   if(this.fLdata.income.incomes != undefined){
    //     this.fLdata.income.incomes.forEach((obj, index) => {
    //       this.monthlyIncome += parseInt(obj.amount)
    //     });
    //   }
    // }
  }
}
