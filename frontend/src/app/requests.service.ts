import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  registerRequestsService(username, password, firstname, lastname, country, mail, type){
    const data = {
      username: username, 
      password: password, 
      firstname: firstname, 
      lastname: lastname, 
      country: country,
      mail: mail,
      type: type
    }

    return this.http.post(`${this.uri}/requests/register`, data);
  }
  
  searchAllRequests(){
    return this.http.get(`${this.uri}/requests/searchAllRequests`);
  }

  searchRequest(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/requests/searchRequest`, data);
  }

  removeRequest(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/requests/removeRequest`, data);
  }
}
