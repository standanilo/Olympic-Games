import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  
  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }
  
  searchSchedule(date, hour, location){
    const data = {
      date: date,
      hour: hour,
      location: location
    }
    return this.http.post(`${this.uri}/schedules/searchSchedule`, data);
  }

  searchScheduleForResults(sport, gender, round){
    const data = {
      sport: sport,
      gender: gender,
      round: round
    }
    return this.http.post(`${this.uri}/schedules/searchScheduleForResults`, data);
  }

  addSchedule(sport, hour, date, round, gender, delegate, location, teams){
    const data = {
      sport: sport, 
      hour: hour, 
      date: date, 
      round: round, 
      gender: gender,
      delegate: delegate,
      location: location,
      teams: teams,
      finished: false
    }
    return this.http.post(`${this.uri}/schedules/addSchedule`, data);
  }

  finishSchedule(sport, gender, round, teams){
    const data = {
      sport: sport,
      gender: gender,
      round: round,
      teams: teams
    }

    return this.http.post(`${this.uri}/schedules/finishSchedule`, data);
  }

  updateSchedule(sport, gender, round, teams){
    const data = {
      sport: sport,
      gender: gender,
      round: round,
      teams: teams
    }

    return this.http.post(`${this.uri}/schedules/updateSchedule`, data);
  }

}
