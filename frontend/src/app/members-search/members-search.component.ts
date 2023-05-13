import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AthletesService } from '../athletes.service';
import { DisciplinesService } from '../disciplines.service';
import { Athletes } from '../models/athletes';
import { Disciplines } from '../models/disciplines';
import { Sports } from '../models/sports';
import { User } from '../models/user';
import { SportsService } from '../sports.service';

@Component({
  selector: 'app-members-search',
  templateUrl: './members-search.component.html',
  styleUrls: ['./members-search.component.css']
})
export class MembersSearchComponent implements OnInit {

  constructor(private athletesService: AthletesService, private sportsService: SportsService, private disciplinesService: DisciplinesService) { }

  ngOnInit(): void {
    this.delegate = JSON.parse(localStorage.getItem('loggedIn'))
    this.country = this.delegate.country;
    this.sportsService.searchAllSports().subscribe((data: Sports[])=>{
      this.sports = data;
      this.sports.sort((a,b) => a.name > b.name ? 1 : -1)
    })
  }

  athletes: Athletes[];
  delegate: User;
  country: string;
  total: number;
  sports: Sports[];
  disciplines: Disciplines[];
  numbers: Array<number>;
  length: number;

  message: string;
  athletesDisc: Athletes[];

  searchForm = new FormGroup({
    sport: new FormControl('', Validators.required),
    discipline: new FormControl('', Validators.required)
  })
  
  get sport(){return this.searchForm.get('sport')}
  get discipline(){return this.searchForm.get('discipline')}

  onChangeSport(){
    this.disciplinesService.searchDisciplineSport(this.sport.value).subscribe((data: Disciplines[])=>{
      this.disciplines = data
      if(this.disciplines) {
        this.length = this.disciplines.length;
      }
      else {
        this.length = 0;
      }
    })
  }

  search(){
    this.athletesService.searchAthletesDiscipline(this.sport.value, this.discipline.value, this.country).subscribe((data: Athletes[])=>{
      this.athletesDisc = data;
      this.athletesDisc.sort((a,b) => a.fullname.split(' ')[1] > b.fullname.split(' ')[1] ? 1 : -1)
      if(this.athletesDisc.length==0){
        this.message = 'There are no athletes in this discipline'
      }
      else {
        this.message = ''
      }
    })
  }


}
