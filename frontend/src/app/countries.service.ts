import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  searchAllCountries() {
    return this.http.get(`${this.uri}/countries/searchAllCountries`);
  }

  addGoldMedal(name) {
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/countries/addGoldMedal`, data);
  }

  addSilverMedal(name) {
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/countries/addSilverMedal`, data);
  }
  
  addBronzeMedal(name) {
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/countries/addBronzeMedal`, data);
  }

  addMember(name) {
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/countries/addMember`, data);
  }
}
