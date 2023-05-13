import { Component, OnInit } from '@angular/core';
import { DisciplinesService } from '../disciplines.service';
import { Disciplines } from '../models/disciplines';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})
export class DisciplinesComponent implements OnInit {

  constructor(private disciplinesService: DisciplinesService) { }

  ngOnInit(): void {
  }

  discipline: string;
  sport: string;
  type: string;
  players: string;

  message: string = "";

  addDiscipline(){
    this.disciplinesService.searchDiscipline(this.sport, this.discipline).subscribe((discipline:Disciplines)=>{
      if(discipline){
        this.message='This competition is already added!';
      }
      else{
        this.disciplinesService.addDiscipline(this.sport, this.discipline, this.type, this.players).subscribe(response=>{
          if(response['message']=='discipline added'){
            alert('Discipline added')
            this.message="";
          }
          else{
            this.message='Error while adding competition!';
          }
        })
      }
    })
  }

}
