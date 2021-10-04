import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { DailyStatListComponent } from './Components/daily-stat-list/daily-stat-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCardComponent } from './Components/user-card/user-card.component';
import { AddDailyStatComponent } from './Components/add-daily-stat/add-daily-stat.component';
import { DeleteDailyStatComponent } from './Components/delete-daily-stat/delete-daily-stat.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    PageNotFoundComponent,
    DailyStatListComponent,
    UserCardComponent,
    AddDailyStatComponent,
    DeleteDailyStatComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
