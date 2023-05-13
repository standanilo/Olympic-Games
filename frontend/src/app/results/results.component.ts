import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { AthletesService } from '../athletes.service';
import { CompetitionsService } from '../competitions.service';
import { CountriesService } from '../countries.service';
import { Athletes } from '../models/athletes';
import { Competitions } from '../models/competitions';
import { Countries } from '../models/countries';
import { Results } from '../models/results';
import { Schedules } from '../models/schedules';
import { User } from '../models/user';
import { ResultsService } from '../results.service';
import { SchedulesService } from '../schedules.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private competitionsService: CompetitionsService, private schedulesService: SchedulesService, private athletesService: AthletesService, 
    private resultsService: ResultsService, private countriesService: CountriesService) { }

  ngOnInit(): void {
    let a = JSON.parse(localStorage.getItem('loggedIn')) as User;
    let b = a.firstname + ' ' + a.lastname;
    this.competitionsService.searchAllCompetitionsDelegate(b).subscribe((data: Competitions[])=>{
    this.competitions = data;
    this.competitions.sort((a,b) => a.sport > b.sport ? 1 : -1)
    this.result = new Array(10)
  })
  }
  
  competitions : Competitions[];
  comp : Competitions;

  s: string;
  sports: string;
  discipline: string;

  message: string;
  show: boolean = false;
  
  schedule: Schedules;
  length: number = 0;
  result: Array<string>;
  placements: Results[];

  rounds: number;
  format: string;

  resultForm = new FormGroup({
    sport: new FormControl('', Validators.required),
    round: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required)
  })
  
  get sport(){return this.resultForm.get('sport')}
  get round(){return this.resultForm.get('round')}
  get gender(){return this.resultForm.get('gender')}

  putShow(){
    this.show = (this.show ? false : true);
  }

  enterResults(){
    this.enter();
    if(this.message=='' || this.message==null){
      this.resultsService.searchResults(this.schedule.sport.split('/')[0], this.schedule.sport.split('/')[1], this.schedule.gender, this.schedule.round).subscribe((data: Results[])=>{
        this.placements = data;
        if(this.round.value=='semifinals' && this.schedule.sport.split('/')[0]=='tennis'){
          let a : Athletes;
          let b : Athletes;
          for(let i = 0; i < this.placements.length; i++){
            if(this.placements[i].team.fullname==this.schedule.teams[0].fullname){
              if(this.placements[i].result[0]=='2:1' || this.placements[i].result[0]=='2:0'){
                a = this.schedule.teams[0];
                b = this.schedule.teams[1];
              }
              else {
                b = this.schedule.teams[0];
                a = this.schedule.teams[1];
              }
            }
          }
          this.schedulesService.updateSchedule(this.schedule.sport, this.schedule.gender, 'finals', a).subscribe((data: Schedules)=>{
            let c = data;
          })
          this.schedulesService.updateSchedule(this.schedule.sport, this.schedule.gender, 'third place', b).subscribe((data: Schedules)=>{
            let c = data;
          })
        }
        else if(this.round.value=='quarterfinals' && this.schedule.sport.split('/')[0]=='tennis'){
          let a : Athletes;
          for(let i = 0; i < this.placements.length; i++){
            if(this.placements[i].team.fullname==this.schedule.teams[0].fullname){
              if(this.placements[i].result[0]=='2:1' || this.placements[i].result[0]=='2:0'){
                a = this.schedule.teams[0];
              }
              else {
                a = this.schedule.teams[1];
              }
            }
          }
          this.schedulesService.updateSchedule(this.schedule.sport, this.schedule.gender, 'semifinals', a).subscribe((data: Schedules)=>{
            let c = data;
          })
        }
        else if(this.round.value=='tiebreak'){
          this.resultsService.searchResults(this.schedule.sport.split('/')[0], this.schedule.sport.split('/')[1], this.schedule.gender, 'finals').subscribe((data: Results[])=>{
            let z = data;
            
            for(let i = 0; i < z.length - 1; i++){
              if(this.placements[0].team.fullname==z[i].team.fullname){
                if(this.placements[1].team.fullname==z[i+1].team.fullname){

                }
                else {
                  let temp = z[i - 1].team;
                  z[i-1].team = z[i].team;
                  z[i].team = temp;
                }
              }
              else if(this.placements[1].team.fullname==z[i].team.fullname){
                if(this.placements[0].team.fullname==z[i+1].team.fullname){
                  let temp = z[i+1].team;
                  z[i+1].team = z[i].team;
                  z[i].team = temp;
                }
                else {
                }
              }
            }
            this.placements = z;
          })
        }
        else {
          let x: Array<number> = new Array();
          for(let i = 0; i < this.placements.length - 1; i++){
            if(this.placements[i + 1].result==this.placements[i].result){
              x.push(i);
              x.push(i + 1);
            }
          }
          if(x.length!=0){
            let y = new Array();
            y.push(this.placements[x.pop()].team);
            y.push(this.placements[x.pop()].team);
            this.schedulesService.addSchedule(this.schedule.sport, this.schedule.hour, this.schedule.date, 'tiebreak', this.schedule.gender, null, null, y).subscribe(response=>{
              if(response['message']=='schedule added'){
                this.message='';
              }
              else{
                this.message='Error while adding schedule!';
              }
            })
          }
        }
        if(this.isDisc()){
          this.placements.reverse();
        }
      })
    } 
    this.schedulesService.finishSchedule(this.schedule.sport, this.schedule.gender, this.schedule.round, this.tempSchedule).subscribe((data: Schedules)=>{
      let c = data;
    })
    for(let q = 0; q < 50; q++){}
  }

  isDisc(){
    if(this.discipline=='high jump' || this.discipline=='long jump' || this.discipline=='triple jump' || this.discipline=='pole vault' || 
    this.discipline=='shot put' || this.discipline=='discus throw' || this.discipline=='javelin jump' || this.discipline=='50m 3 positions' || 
    this.discipline=='10m air pistol' || this.discipline=='10m air rifle' || this.discipline=='25m low caliber pistol') return true;
    else return false;
  }
  
  isEnd(){
    if(this.round.value=='finals' && this.sport.valid){
      return true;
    }
    else return false;
  }

  enter(){
    for(let i = 0; i < this.schedule.teams.length; i++){
      let results : string;
        results=this.result[i]
      this.resultsService.addResult(this.schedule.sport.split('/')[0], this.schedule.sport.split('/')[1], this.schedule.gender, this.schedule.round, this.schedule.teams[i], results).subscribe(response=>{
        if(response['message']=='result added'){
          console.log('result added')
          this.message='';
        }
        else{
          // this.message='Error while adding result!';
        }
      })
    }
  }

  tempSchedule: Athletes[] = new Array;

  search(){
    this.placements = null;
    this.message = "";
    this.schedulesService.searchScheduleForResults(this.sport.value, this.gender.value, this.round.value).subscribe((schedule: Schedules)=>{
      if(schedule){
        this.schedule = schedule;
        this.discipline = this.schedule.sport.split('/')[1]
        for(let i = 0; i < schedule.teams.length; i++){
          this.tempSchedule[i] = schedule.teams[i];
        }
        if(this.schedule.teams){
          this.schedule.teams.sort((a,b) => a.index > b.index ? 1 : -1)
          if(schedule.finished){
            this.length = 0;
            this.message = "This competition ended";
          }
          else {
            for(let i = 0; i < this.competitions.length; i++){
              if(this.competitions[i].discipline==this.schedule.sport.split('/')[1]){
                this.rounds = this.competitions[i].format.split('x')[0] as unknown as number;
                this.format = this.competitions[i].format.split('x')[1];
              }
            }
            this.length = 1;
          }
        }
        else{
          this.message = "Last round hasn't finished yet";
        }
      }
      else {
        this.length = 0;
      }
    })
  }

  endCompetition(){
    this.competitionsService.endCompetition(this.sport.value.split('/')[0], this.sport.value.split('/')[1], this.gender.value).subscribe((comp: Competitions)=>{
      if(comp.sport!='tennis'){
        this.countriesService.addGoldMedal(this.placements[0].team.country).subscribe((res)=>{
          if(res['poruka']!='ok'){
            alert('Error')
          }
          else{
            
          }
        })
        this.athletesService.updateMedals(this.sport.value.split('/')[0], this.placements[0].team.gender, this.placements[0].team.fullname, this.placements[0].team.country).subscribe((res)=>{
          if(res['poruka']!='ok'){
            alert('Error')
          }
          else{
            
          }
        })
        this.countriesService.addSilverMedal(this.placements[1].team.country).subscribe((res)=>{
          if(res['poruka']!='ok'){
            alert('Error')
          }
          else{
            
          }
        })
        this.athletesService.updateMedals(this.sport.value.split('/')[0], this.placements[1].team.gender, this.placements[1].team.fullname, this.placements[1].team.country).subscribe((res)=>{
          if(res['poruka']!='ok'){
            alert('Error')
          }
          else{
            
          }
        })
        this.countriesService.addBronzeMedal(this.placements[2].team.country).subscribe((res)=>{
          if(res['poruka']!='ok'){
            alert('Error')
          }
          else{
            
          }
        })
        this.athletesService.updateMedals(this.sport.value.split('/')[0], this.placements[2].team.gender, this.placements[2].team.fullname, this.placements[2].team.country).subscribe((res)=>{
          if(res['poruka']!='ok'){
            alert('Error')
          }
          else{
            
          }
        })
      }
      else{
        if(this.placements[0].result[0]=='2:1' || this.placements[0].result[0]=='2:0'){
          this.countriesService.addGoldMedal(this.placements[0].team.country).subscribe((res)=>{
            if(res['poruka']!='ok'){
              alert('Error')
            }
            else{
              
            }
          })
          this.athletesService.updateMedals(this.sport.value.split('/')[0], this.placements[0].team.gender, this.placements[0].team.fullname, this.placements[0].team.country).subscribe((res)=>{
            if(res['poruka']!='ok'){
              alert('Error')
            }
            else{
              
            }
          })
          this.countriesService.addSilverMedal(this.placements[1].team.country).subscribe((res)=>{
            if(res['poruka']!='ok'){
              alert('Error')
            }
            else{
              
            }
          })
          this.athletesService.updateMedals(this.sport.value.split('/')[0], this.placements[1].team.gender, this.placements[1].team.fullname, this.placements[1].team.country).subscribe((res)=>{
            if(res['poruka']!='ok'){
              alert('Error')
            }
            else{
              
            }
          })
        }
        else {
          this.countriesService.addGoldMedal(this.placements[1].team.country).subscribe((res)=>{
            if(res['poruka']!='ok'){
              alert('Error')
            }
            else{
              
            }
          })
          this.athletesService.updateMedals(this.sport.value.split('/')[0], this.placements[1].team.gender, this.placements[1].team.fullname, this.placements[1].team.country).subscribe((res)=>{
            if(res['poruka']!='ok'){
              alert('Error')
            }
            else{
              
            }
          })
          this.countriesService.addSilverMedal(this.placements[0].team.country).subscribe((res)=>{
            if(res['poruka']!='ok'){
              alert('Error')
            }
            else{
              
            }
          })
          this.athletesService.updateMedals(this.sport.value.split('/')[0], this.placements[0].team.gender, this.placements[0].team.fullname, this.placements[0].team.country).subscribe((res)=>{
            if(res['poruka']!='ok'){
              alert('Error')
            }
            else{
              
            }
          })
        }
        this.resultsService.searchResults(this.sport.value.split('/')[0], this.sport.value.split('/')[1], this.gender.value, 'third place').subscribe((data: Results[])=>{
          let a = data;
          if(a[0].result[0]=='2:1' || a[0].result[0]=='2:0'){
            this.countriesService.addBronzeMedal(a[0].team.country).subscribe((res)=>{
              if(res['poruka']!='ok'){
                alert('Error')
              }
              else{
                
              }
            })
            this.athletesService.updateMedals(this.sport.value.split('/')[0], a[0].team.gender, a[0].team.fullname, a[0].team.country).subscribe((res)=>{
              if(res['poruka']!='ok'){
                alert('Error')
              }
              else{
                
              }
            })
          }
          else {
            this.countriesService.addBronzeMedal(a[1].team.country).subscribe((res)=>{
              if(res['poruka']!='ok'){
                alert('Error')
              }
              else{
                
              }
            })
            this.athletesService.updateMedals(this.sport.value.split('/')[0], a[1].team.gender, a[1].team.fullname, a[1].team.country).subscribe((res)=>{
              if(res['poruka']!='ok'){
                alert('Error')
              }
              else{
                
              }
            })
          }
        })
      }
    })
  }

}