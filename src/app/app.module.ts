import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule } from '@angular/material/input';
import {MatSelectModule } from '@angular/material/select';
import {MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule } from '@angular/material/checkbox';
import {MatChipsModule } from '@angular/material/chips';
import {MatIconModule } from '@angular/material/icon';
import { CookieService } from "ngx-cookie-service";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { MainComponent } from './main.component';
import { HomeComponent } from './home.component';
import { IncomeComponent } from './income.component';
import { ExpencesComponent } from './expences/expences.component';
import { BasicDisplayComponent } from './basic-display/basic-display.component';

import { incomeEffects } from "./incomes/incomes.effects"
import  {incomeReducer} from "./incomes/incomes.reducer"
import { environment } from 'src/environments/environment';
import { BankStatusComponent } from './bank-status/bank-status.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    HomeComponent,
    IncomeComponent,
    ExpencesComponent,
    BasicDisplayComponent,
    BankStatusComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: "Home", component: HomeComponent},
      {path: "Income", component: IncomeComponent},
      {path: "Expences", component: ExpencesComponent},
      {path: "BankStatus", component: BankStatusComponent}
    ]),
    StoreModule.forRoot({ incomes: incomeReducer }),
    EffectsModule.forRoot([incomeEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }