import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MedalsComponent } from './medals/medals.component';
import { CountriesComponent } from './countries/countries.component';
import { AthletesComponent } from './athletes/athletes.component';
import { MenuComponent } from './menu/menu.component';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { SportsComponent } from './sports/sports.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { RecordsComponent } from './records/records.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ResultsComponent } from './results/results.component';
import { RequestsComponent } from './requests/requests.component';
import { TeamsComponent } from './teams/teams.component';
import { MembersComponent } from './members/members.component';
import { ChartsModule } from 'ng2-charts';
import { MembersSearchComponent } from './members-search/members-search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChangepasswordComponent,
    MedalsComponent,
    CountriesComponent,
    AthletesComponent,
    MenuComponent,
    DisciplinesComponent,
    SportsComponent,
    CompetitionsComponent,
    RecordsComponent,
    ScheduleComponent,
    ResultsComponent,
    RequestsComponent,
    TeamsComponent,
    MembersComponent,
    MembersSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
