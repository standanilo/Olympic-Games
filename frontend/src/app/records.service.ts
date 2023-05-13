import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  searchAllMales() {
    return this.http.get(`${this.uri}/records/searchAllMales`);
  }

  searchAllFemales() {
    return this.http.get(`${this.uri}/records/searchAllFemales`);
  }
}
