import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AthletesService } from '../athletes.service';
import { CompetitionsService } from '../competitions.service';
import { CountriesService } from '../countries.service';
import { Athletes } from '../models/athletes';
import { Competitions } from '../models/competitions';
import { Sports } from '../models/sports';
import { User } from '../models/user';
import { SportsService } from '../sports.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  constructor(private sportsService: SportsService, private athletesService: AthletesService, private competitionsService: CompetitionsService, private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.sportsService.searchAllSports().subscribe((data: Sports[])=>{
    this.sports = data;
    this.sports.sort((a,b) => a.name > b.name ? 1 : -1)
    this.delegate = JSON.parse(localStorage.getItem('loggedIn'));
  })
  }

  sports: Sports[];
  delegate: User;
  message: string;

  addForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    sport: new FormControl('', Validators.required),
    discipline: new FormControl('', Validators.required)
  })
  
  get firstname(){return this.addForm.get('firstname')}
  get lastname(){return this.addForm.get('lastname')}
  get gender(){return this.addForm.get('gender')}
  get sport(){return this.addForm.get('sport')}
  get discipline(){return this.addForm.get('discipline')}

  add(){
    let a: string = this.firstname.value + ' ' + this.lastname.value;
    let disciplines: Array<string> = new Array();
    for(let i = 0; i < (this.discipline.value as string).split(', ').length; i++){
      disciplines[i] = (this.discipline.value as string).split(', ')[i];
      this.competitionsService.searchCompetition(this.sport.value, disciplines[i], this.gender.value).subscribe((data: Competitions)=>{
        // !!! ako postoji takmicenje onda je svakako kasna prijava
        // if(data){
        //   this.message = this.message + 'You are too late for ' + this.sport.value + '/' + disciplines[i] + '\n'
        // }
        if(data){
          let c = data.dateFrom.toString();
          let today = new Date().toISOString();
          if(c > today){
            this.message = this.message + 'You are too late for ' + this.sport.value + '/' + disciplines[i] + '\n'
          }
        }
      })
    }
    this.athletesService.searchAthlete(this.sport.value, this.gender.value, a, this.delegate.country).subscribe((data: Athletes)=>{
      if(data){
        for(let j = 0; j < disciplines.length; j++){
          this.athletesService.updateDiscipline(this.sport.value, this.gender.value, a, this.delegate.country, disciplines[j]).subscribe((res)=>{
            if(res['poruka']!='ok'){
              alert('Error')
            }
            else{
              alert('athlete updated')
            }
          })
        }
      }
      else {
        this.athletesService.addAthlete(this.sport.value, this.gender.value, a, this.delegate.country, disciplines).subscribe(response=>{
          if(response['message']=='athlete added'){
            this.countriesService.addMember(this.delegate.country).subscribe((res)=>{
              if(res['poruka']!='ok'){
                alert('Error')
              }
              else{
                
              }
            })
            alert('athlete added')
          }
          else{
            this.message='Error while adding athlete!';
          }
        })
      }
    })
  }
}
