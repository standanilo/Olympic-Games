import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AthletesComponent } from './athletes/athletes.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { CountriesComponent } from './countries/countries.component';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { LoginComponent } from './login/login.component';
import { MedalsComponent } from './medals/medals.component';
import { MembersSearchComponent } from './members-search/members-search.component';
import { MembersComponent } from './members/members.component';
import { MenuComponent } from './menu/menu.component';
import { RecordsComponent } from './records/records.component';
import { RegisterComponent } from './register/register.component';
import { RequestsComponent } from './requests/requests.component';
import { ResultsComponent } from './results/results.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SportsComponent } from './sports/sports.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'changepassword', component: ChangepasswordComponent},
  {path: '', component: MenuComponent},
  {path: 'logout', component: MenuComponent},
  {path: 'medals', component: MedalsComponent},
  {path: 'countries', component: CountriesComponent},
  {path: 'athletes', component: AthletesComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'menu/countries', component: CountriesComponent},
  {path: 'menu/medals', component: MedalsComponent},
  {path: 'menu/athletes', component: AthletesComponent},
  {path: 'menu/sports', component: SportsComponent},
  {path: 'disciplinesdisciplines', component: DisciplinesComponent},
  {path: 'sports', component: SportsComponent},
  {path: 'disciplines', component: DisciplinesComponent},
  {path: 'competitions', component: CompetitionsComponent},
  {path: 'menu/competitions', component: CompetitionsComponent},
  {path: 'records', component: RecordsComponent},
  {path: 'menu/records', component: RecordsComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'menu/schedule', component: ScheduleComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'menu/results', component: ResultsComponent},
  {path: 'requests', component: RequestsComponent},
  {path: 'menu/requests', component: RequestsComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'menu/teams', component: TeamsComponent},
  {path: 'members', component: MembersComponent},
  {path: 'menu/members', component: MembersComponent},
  {path: 'members-search', component: MembersSearchComponent},
  {path: 'menu/members-search', component: MembersSearchComponent},
  {path: '**', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
