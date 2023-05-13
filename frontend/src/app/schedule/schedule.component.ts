import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from '../competitions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Competitions } from '../models/competitions';
import { SchedulesService } from '../schedules.service';
import { Schedules } from '../models/schedules';
import { AthletesService } from '../athletes.service';
import { User } from '../models/user';
import { Athletes } from '../models/athletes';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private competitionsService: CompetitionsService, private schedulesService: SchedulesService, private athletesService: AthletesService) { }

  ngOnInit(): void {
    let a = JSON.parse(localStorage.getItem('loggedIn')) as User;
    let b = a.firstname + ' ' + a.lastname;
    this.competitionsService.searchAllCompetitionsDelegate(b).subscribe((data: Competitions[])=>{
    this.competitions = data;
    this.competitions.sort((a,b) => a.sport > b.sport ? 1 : -1)
    this.team = new Array()
  })
  }
  
  competitions : Competitions[];
  comp: Competitions;
  indexes: Array<number>;

  team: Athletes[];


  add(athlete: Athletes){
    for(let i = 0; i < this.team.length; i++){
      if(this.team[i].fullname==athlete.fullname) return;
    }
    this.team.push(athlete);
  }

  searchSport(){
    this.team = [];
    this.comp = null;
    this.s = this.sport.value;
    this.sports = this.s.split('/')[0];
    this.discipline = this.s.split('/')[1];
    this.competitionsService.searchCompetition(this.sports, this.discipline, this.gender.value).subscribe((data: Competitions)=>{
      this.comp = data;
      this.dateFrom = this.date.value;
      if(this.dateFrom < this.comp.dateFrom.toString().slice(0, 10) || this.dateFrom > this.comp.dateTo.toString().slice(0, 10)) {
        this.message = "Date of the " + this.round.value + " must be between " + this.comp.dateFrom.toLocaleString().substring(0, 10) + " and " + this.comp.dateTo.toLocaleString().substring(0, 10);
      }
      else{
        this.schedulesService.searchSchedule(this.date.value, this.hour.value, this.comp.location).subscribe((schedule: Schedules)=>{
          if(schedule){
            this.message='There is already a schedule at that time and place!';
          }
          else {
            this.message=''
          }
        })
      }
    })
  }

  schedule(){
    this.s = this.sport.value;
    this.sports = this.s.split('/')[0];
    this.discipline = this.s.split('/')[1];
    this.competitionsService.searchCompetition(this.sports, this.discipline, this.gender.value).subscribe((data: Competitions)=>{
      this.comp = data;
      this.dateFrom = this.date.value;
      if(this.dateFrom < this.comp.dateFrom.toString().slice(0, 10) || this.dateFrom > this.comp.dateTo.toString().slice(0, 10)) {
        this.message = "Date of the " + this.round.value + " must be between " + this.comp.dateFrom.toLocaleString().substring(0, 10) + " and " + this.comp.dateTo.toLocaleString().substring(0, 10);
      }
      else if(this.comp.finished){
        this.message='This competition ended!';
      }
      else{
        this.schedulesService.searchSchedule(this.date.value, this.hour.value, this.comp.location).subscribe((schedule: Schedules)=>{
          if(schedule){
            this.message='There is already a schedule at that time and place!';
          }
          else{
            this.indexes = new Array(this.team.length)
            for(let i = 0; i < this.indexes.length; i++){
              this.indexes[i] = 0;
            }
            this.randomiseTeams();
            this.team.sort((a,b) => a.index > b.index ? 1 : -1)
            if(this.sports=='tennis' && this.round.value=='all'){
              for(let i = 0; i < 4; i++){
                let a = new Array(2);
                a[0] = this.team[2 * i];
                a[1] = this.team[2 * i + 1];
                this.schedulesService.addSchedule(this.sport.value, this.hour.value, this.dateFrom, "quarterfinals", this.gender.value, this.comp.delegate, this.comp.location, a).subscribe(response=>{
                  if(response['message']=='schedule added'){
                    this.message='';
                  }
                  else{
                    this.message='Error while adding schedule!';
                  }
                })
              }
              let a = this.dateFrom.split('-')[2] as unknown as number;
              a++;
              a as unknown as string;
              this.dateFrom = this.dateFrom.slice(0, 8) + a;
              let c = new Array(2);
              for(let i = 0; i < 2; i++){
                this.schedulesService.addSchedule(this.sport.value, this.hour.value, this.dateFrom, "semifinals", this.gender.value, this.comp.delegate, this.comp.location, []).subscribe(response=>{
                  if(response['message']=='schedule added'){
                    this.message='';
                  }
                  else{
                    this.message='Error while adding schedule!';
                  }
                })
              }
              let b = this.dateFrom.split('-')[2] as unknown as number;
              b++;
              b as unknown as string;
              this.dateFrom = this.dateFrom.slice(0, 8) + b;
              this.schedulesService.addSchedule(this.sport.value, this.hour.value, this.dateFrom, "finals", this.gender.value, this.comp.delegate, this.comp.location, []).subscribe(response=>{
                if(response['message']=='schedule added'){
                  this.message='';
                }
                else{
                  this.message='Error while adding schedule!';
                }
              })
              this.schedulesService.addSchedule(this.sport.value, this.hour.value, this.dateFrom, "third place", this.gender.value, this.comp.delegate, this.comp.location, []).subscribe(response=>{
                if(response['message']=='schedule added'){
                  this.message='';
                  alert('Schedules added')
                }
                else{
                  this.message='Error while adding schedule!';
                }
              })
            }
            else{
              this.schedulesService.addSchedule(this.sport.value, this.hour.value, this.dateFrom, this.round.value, this.gender.value, this.comp.delegate, this.comp.location, this.team).subscribe(response=>{
                if(response['message']=='schedule added'){
                  alert('Schedule added')
                  this.message='';
                }
                else{
                  this.message='Error while adding schedule!';
                }
              })
            }
          }
        })
      }
    })
  }

  s: string;
  sports: string;
  discipline: string;
  dateFrom: string;
  message: string;
  
  
  scheduleForm = new FormGroup({
    sport: new FormControl('', Validators.required),
    hour: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    round: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required)
  })
  
  get hour(){return this.scheduleForm.get('hour')}
  get date(){return this.scheduleForm.get('date')}
  get sport(){return this.scheduleForm.get('sport')}
  get round(){return this.scheduleForm.get('round')}
  get gender(){return this.scheduleForm.get('gender')}

  randomiseTeams(){
    for(let i = 0; i < this.indexes.length; i++){
      this.indexes[i] = Math.floor(Math.random() * this.indexes.length) + 1;;
      for(let j = 0; j < this.indexes.length; j++){
        if(j==i) {
          continue;
        }
        else if(this.indexes[i]==this.indexes[j]){
          i--;
          break;
        }
      }
    }
    for(let i = 0; i < this.indexes.length; i++){
      this.team[i].index = this.indexes[i];
    }
  }
}
