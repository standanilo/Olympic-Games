import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisciplinesService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  searchAllDisciplines() {
    return this.http.get(`${this.uri}/disciplines/searchAllDisciplines`);
  }

  searchDiscipline(sport, discipline){
    const data = {
      sport: sport,
      discipline: discipline
    }
    return this.http.post(`${this.uri}/disciplines/searchDiscipline`, data);
  } 
  
  searchDisciplineSport(sport){
    const data = {
      sport: sport
    }
    return this.http.post(`${this.uri}/disciplines/searchDisciplineSport`, data);
  }

  addDiscipline(sport, discipline, type, players){
    const data = {
      sport: sport,
      discipline: discipline,
      type: type,
      players: players
    }
    return this.http.post(`${this.uri}/disciplines/addDiscipline`, data);
  }

}
