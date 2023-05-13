import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SportsService } from './sports.service';

@Injectable({
  providedIn: 'root'
})
export class AthletesService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  searchAthletes(fullname, country, sport, discipline, gender){
    const data = {
      fullname: fullname,
      country: country,
      sport: sport,
      discipline: discipline,
      gender: gender
    }

    return this.http.post(`${this.uri}/athletes/searchAthletes`, data);
  }
  
  searchAthletesForComp(sport, discipline, gender){
    const data = {
      sport: sport,
      discipline: discipline,
      gender: gender
    }

    return this.http.post(`${this.uri}/athletes/searchAthletesForComp`, data);
  }

  updateIndex(fullname, discipline, index){
    const data = {
      fullname: fullname,
      discipline: discipline,
      index: index
    }

    return this.http.post(`${this.uri}/athletes/updateIndex`, data);
  }
  
  searchAthlete(sport, gender, fullname, country){
    const data = {
      sport: sport,
      gender: gender,
      fullname: fullname,
      country: country
    }

    return this.http.post(`${this.uri}/athletes/searchAthlete`, data);
  }

  updateDiscipline(sport, gender, fullname, country, discipline){
    const data = {
      sport: sport,
      gender: gender,
      fullname: fullname,
      country: country,
      discipline: discipline
    }

    return this.http.post(`${this.uri}/athletes/updateDiscipline`, data);
  }

  updateMedals(sport, gender, fullname, country){
    const data = {
      sport: sport,
      gender: gender,
      fullname: fullname,
      country: country
    }

    return this.http.post(`${this.uri}/athletes/updateMedals`, data);
  }

  addAthlete(sport, gender, fullname, country, discipline){
    const data = {
      sport: sport,
      gender: gender,
      fullname: fullname,
      country: country,
      discipline: discipline,
      index: 0,
      medals: 0
    }

    return this.http.post(`${this.uri}/athletes/addAthlete`, data);
  }

  searchAthletesDiscipline(sport, discipline, country){
    const data = {
      sport: sport,
      discipline: discipline,
      country: country
    }

    return this.http.post(`${this.uri}/athletes/searchAthletesDiscipline`, data);
  }
}
