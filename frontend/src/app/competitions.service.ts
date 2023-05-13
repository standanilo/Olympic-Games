import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  searchCompetition(sport, discipline, gender){
    const data = {
      sport: sport,
      discipline: discipline,
      gender: gender
    }
    return this.http.post(`${this.uri}/competitions/searchCompetition`, data);
  }

  searchAllCompetitions(){
    return this.http.get(`${this.uri}/competitions/searchAllCompetitions`);
  }

  searchAllCompetitionsDelegate(delegate: string){
    const data = {
      delegate: delegate
    }
    return this.http.post(`${this.uri}/competitions/searchAllCompetitionsDelegate`, data);
  }

  addCompetition(sport, discipline, type, format, dateFrom, dateTo, location, delegate, gender, teams){
    const data = {
      sport: sport,
      discipline: discipline,
      type: type,
      format: format,
      dateFrom: dateFrom,
      dateTo: dateTo,
      location: location,
      delegate: delegate,
      gender: gender,
      teams: teams,
      finished: false
    }
    return this.http.post(`${this.uri}/competitions/addCompetition`, data);
  }
  
  endCompetition(sport, discipline, gender){
    const data = {
      sport: sport,
      discipline: discipline,
      gender: gender
    }
    return this.http.post(`${this.uri}/competitions/endCompetition`, data);
  }

}
