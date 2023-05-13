import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  addResult(sport, discipline, gender, round, team, result){
    const data = {
      sport: sport, 
      discipline: discipline, 
      gender: gender,
      round: round,
      team: team,
      result: result
    }
    return this.http.post(`${this.uri}/results/addResult`, data);
  }

  searchResults(sport, discipline, gender, round){
    const data = {
      sport: sport,
      discipline: discipline,
      gender: gender,
      round: round
    }
    return this.http.post(`${this.uri}/results/searchResults`, data);
  }
}
