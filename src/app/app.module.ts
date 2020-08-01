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
import {MatInputModule } from '@angular/material/input';
import {MatSelectModule } from '@angular/material/select';
import {MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule } from '@angular/material/checkbox';
import {MatChipsModule } from '@angular/material/chips';
import {MatIconModule } from '@angular/material/icon';
import { CookieService } from "ngx-cookie-service";
import { BasicDisplayComponent } from './basic-display/basic-display.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import  {reducer} from "./reducers/incomes.reducer"


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    HomeComponent,
    IncomeComponent,
    ExpencesComponent,
    BasicDisplayComponent,
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
      {path: "Expences", component: ExpencesComponent}
    ]),
    StoreModule.forRoot({
      incomes: reducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }