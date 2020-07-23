import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ENTITY_METADATA_TOKEN, PLURAL_NAMES_TOKEN } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { IncomsEffects } from './incoms.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([IncomsEffects]),
    //StoreModule.forFeature("incoms")
  ],
  providers:[
    {provide: ENTITY_METADATA_TOKEN, multi:true, useValue:{
      Incoms: {},
    }},
    {provide: PLURAL_NAMES_TOKEN, multi: true, useValue: {
      "Incoms": "Incoms"
    }}
  ]
})
export class IncomsModule { }
