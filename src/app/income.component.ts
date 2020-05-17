
import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'Income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss']
})

export class IncomeComponent implements OnInit{

    incomeFormControl: FormControl = new FormControl("");

    constructor(){
        
    }

    ngOnInit(){
        this.incomeFormControl.valueChanges.subscribe((value : string) => {
            console.log(value);
        })
    }

}