import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AthletesService } from '../athletes.service';
import { DisciplinesService } from '../disciplines.service';
import { Athletes } from '../models/athletes';
import { Disciplines } from '../models/disciplines';
import { Sports } from '../models/sports';
import { User } from '../models/user';
import { SportsService } from '../sports.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private athletesService: AthletesService, private sportsService: SportsService, private disciplinesService: DisciplinesService, private router: Router) { }

  ngOnInit(): void {
    this.delegate = JSON.parse(localStorage.getItem('loggedIn'))
    this.country = this.delegate.country;
    this.athletesService.searchAthletes("", this.country, "", "", "").subscribe((data: Athletes[])=>{
      this.athletes = data;
      if(this.athletes){
        this.total = this.athletes.length;
      }
      else {
        this.total = 0;
      }
    })
    this.country = this.delegate.country;
    this.sportsService.searchAllSports().subscribe((data: Sports[])=>{
      this.sports = data;
      this.sports.sort((a,b) => a.name > b.name ? 1 : -1)
      this.numbers = new Array(this.sports.length)
      for(let i = 0; i < this.sports.length; i++){
        this.athletesService.searchAthletes("", this.country, this.sports[i].name, "", "").subscribe((data: Athletes[])=>{
          if(data){
            this.numbers[i] = data.length
          }
          else {
            this.numbers[i] = 0;
          }
        })
      }
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

  athletesDisc: Athletes[];

  search(){
    this.router.navigate(['members-search']);
  }

}
