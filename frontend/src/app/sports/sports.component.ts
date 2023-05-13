import { Component, OnInit } from '@angular/core';
import { Sports } from '../models/sports';
import { SportsService } from '../sports.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  constructor(private sportsService : SportsService) { }

  ngOnInit(): void {
  }
  
  sport: string;

  message: string;

  addSport(){
    this.sportsService.searchSport(this.sport).subscribe((sport:Sports)=>{
      if(sport){
        this.message='This sport is already added!';
      }
      else{
        this.sportsService.addSport(this.sport).subscribe(response=>{
          if(response['message']=='sport added'){
            alert('Sport added')
            this.message="";
          }
          else{
            this.message='Error while adding sport!';
          }
        })
      }
    })
  }
}
