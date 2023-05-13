import { Component, OnInit } from '@angular/core';
import { AthletesService } from '../athletes.service';
import { CountriesService } from '../countries.service';
import { DisciplinesService } from '../disciplines.service';
import { Athletes } from '../models/athletes';
import { Countries } from '../models/countries';
import { Disciplines } from '../models/disciplines';
import { Sports } from '../models/sports';
import { SportsService } from '../sports.service';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.css']
})
export class AthletesComponent implements OnInit {

  constructor(private athletesServis: AthletesService, private countriesService : CountriesService, private sportsService : SportsService, private disciplinesService : DisciplinesService) { }

  ngOnInit(): void {
    this.countriesService.searchAllCountries().subscribe((data: Countries[])=>{
      this.countries = data;
      this.countries.sort((a,b) => a.name > b.name ? 1 : -1)
    })
    this.sportsService.searchAllSports().subscribe((data: Sports[])=>{
      this.sports = data;
      this.sports.sort((a,b) => a.name > b.name ? 1 : -1)
    })
    this.disciplinesService.searchAllDisciplines().subscribe((data: Disciplines[])=>{
      this.disciplines = data;
      this.disciplines.sort((a,b) => a.sport > b.sport ? 1 : -1)
    })
  }

  fullname : string;
  country : string;
  sport: string;
  discipline: string;
  gender: string;
  medals: boolean;

  p: number = 1;
  n: number = 10;

  athletes: Athletes[];
  countries: Countries[];
  disciplines: Disciplines[];
  sports: Sports[];
  length: number = 0;
  message: string = "";

  search(){
    if(!this.fullname){
      this.fullname="";
    }
    if(!this.country){
      this.country="";
    }
    if(!this.sport){
      this.sport="";
    }
    if(!this.discipline){
      this.discipline="";
    }
    if(!this.gender){
      this.gender="";
    }
    this.athletesServis.searchAthletes(this.fullname, this.country, this.sport, this.discipline, this.gender).subscribe((data: Athletes[])=>{
      this.athletes = data;
      this.athletes.sort((a,b) => a.country > b.country ? 1 : -1)
      if(this.athletes) {
        this.length = this.athletes.length;
        if(this.length==0) this.message = "There are no athletes with given criteria!";
        else this.message = "";
      }
      else {
        this.length = 0;
        this.message = "There are no athletes with given criteria!";
      }
    })
  }
}
