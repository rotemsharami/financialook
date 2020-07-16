import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header.component';
import {MainComponent} from './main.component';
import {HomeComponent} from './home.component';
import {IncomeComponent} from './income.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpencesComponent } from './expences/expences.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    HomeComponent,
    IncomeComponent,
    ExpencesComponent
  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule,
    RouterModule.forRoot([
      {path: "Home", component: HomeComponent},
      {path: "Income", component: IncomeComponent},
      {path: "Expences", component: ExpencesComponent}
    ]),
    BrowserAnimationsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
