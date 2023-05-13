import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  searchAllSports() {
    return this.http.get(`${this.uri}/sports/searchAllSports`);
  }

  searchSport(name){
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/sports/searchSport`, data);
  }

  addSport(name){
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/sports/addSport`, data);
  }
}
