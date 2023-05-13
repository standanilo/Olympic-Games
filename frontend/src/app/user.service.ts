import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000'
  
  constructor(private http: HttpClient, private router : Router) { }

  isLoggedin : User;

  signInService(username, password){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }

  isLoggedIn(): User {

    if (JSON.parse(localStorage.getItem('loggedIn')) == null) {
      this.isLoggedin = null;
      return this.isLoggedin;
    }
    else return JSON.parse(localStorage.getItem('loggedIn'));
  }

  registerUserService(username, password, firstname, lastname, country, mail, type){
    const data = {
      username: username, 
      password: password, 
      firstname: firstname, 
      lastname: lastname, 
      country: country,
      mail: mail,
      type: type,
      numOfComp: 0
    }

    return this.http.post(`${this.uri}/users/register`, data);
  }

  changePassword(username, password, newPassword){
    const data = {
      username: username, 
      password: password, 
      newPassword: newPassword, 
    }

    return this.http.post(`${this.uri}/users/changePassword`, data);
  }


  searchAllCompDelegates(){
    return this.http.get(`${this.uri}/users/searchAllCompDelegates`);
  }

  searchAllCompDelegatesAvail(){
    return this.http.get(`${this.uri}/users/searchAllCompDelegatesAvail`);
  }

  searchCompDelegate(firstname, lastname){
    const data = {
      firstname: firstname,
      lastname: lastname
    }
    return this.http.post(`${this.uri}/users/searchCompDelegate`, data);
  }


  searchCountry(country){
    const data = {
      country: country
    }
    return this.http.post(`${this.uri}/users/searchCountry`, data);
  }
}
