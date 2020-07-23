import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ENTITY_METADATA_TOKEN } from '@ngrx/data';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //StoreModule.forFeature("incoms")
  ],
  providers:[
    {provide: ENTITY_METADATA_TOKEN, multi:true, useValue:{
      Incoms: {}
    }}
  ]
})
export class IncomsModule { }
