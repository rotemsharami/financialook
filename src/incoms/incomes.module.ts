import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ENTITY_METADATA_TOKEN, PLURAL_NAMES_TOKEN } from '@ngrx/data';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //EffectsModule.forFeature([IncomesEffects]),
    //StoreModule.forFeature("Incomes")
  ],
  providers:[
    {provide: ENTITY_METADATA_TOKEN, multi:true, useValue:{
      Incomes: {},
    }},
    {provide: PLURAL_NAMES_TOKEN, multi: true, useValue: {
      "Incomes": "Incomes"
    }}
  ]
})
export class IncomesModule { }
