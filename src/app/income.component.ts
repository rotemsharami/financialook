
import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import { MetadataService } from './metadata.service';

@Component({
    selector: 'Income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss']
})

export class IncomeComponent implements OnInit{
    SalaryFormControl: FormControl = new FormControl("");
    constructor(){}
    ngOnInit(){
        this.SalaryFormControl.valueChanges.subscribe((value : string) => {
            console.log(value);
        })
    }
}