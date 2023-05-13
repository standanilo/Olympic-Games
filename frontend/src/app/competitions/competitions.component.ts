import { Component, OnInit } from '@angular/core';
import { AthletesService } from '../athletes.service';
import { CompetitionsService } from '../competitions.service';
import { Athletes } from '../models/athletes';
import { Competitions } from '../models/competitions';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  constructor(private competitionsService: CompetitionsService, private userService: UserService, private athletesService: AthletesService) { }

  ngOnInit(): void {
    this.userService.searchAllCompDelegatesAvail().subscribe((data: User[])=>{
      this.delegates = data;
      this.delegates.sort((a,b) => a.firstname > b.firstname ? 1 : -1)
    })
    this.competitionsService.searchAllCompetitions().subscribe((data: Competitions[])=>{
      this.comp = data;
      
    })
  }

  sport: string;
  discipline: string;
  type: string;
  format: string;
  dateFrom: Date;
  dateTo: Date;
  location: string;
  gender: string;
  delegate: string[];
  
  teams: Athletes[];


  delegates: User[];
  delNumOfComp: number[];
  comp: Competitions[];

  message: string = "";

  addCompetition(){
    if(this.dateFrom > this.dateTo){
      this.message = 'Bad date entered!'
    }
    else{
      this.competitionsService.searchCompetition(this.sport, this.discipline, this.gender).subscribe((competition :Competitions)=>{
        if(competition){
          this.message='This competition is already added!';
        }
        else{this.athletesService.searchAthletesForComp(this.sport, this.discipline, this.gender).subscribe((data: Athletes[])=>{
          this.teams = data;
          if(this.teams.length!=0){
            this.competitionsService.addCompetition(this.sport, this.discipline, this.type, this.format, this.dateFrom, this.dateTo, this.location, this.delegate, this.gender, this.teams).subscribe(response=>{
              if(response['message']=='competition added'){
                for(let i = 0; i < this.delegate.length; i++){
                  this.userService.searchCompDelegate(this.delegate[i].split(' ')[0], this.delegate[i].split(' ')[1]).subscribe((res)=>{
                    if(res['poruka']!='ok'){
                      alert('Greska')
                    }
                    else{
                      window.location.reload();
                    }
                  })
                }
                alert('Competition added')
                this.message="";
              }
              else{
                this.message='Error while adding competition!';
              }
          })}
          else {
            this.message='There are no athletes in this sport!';
          }
        });
          
        }
      })
    }
  }
}
