import { Component } from '@angular/core';
import { User } from './models/user';
import { UserService } from "../app/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public userService: UserService, private router : Router){}
  loggedIn: User = null;
  typeUser : string;
  ngOnInit() {
    this.loggedIn = this.userService.isLoggedIn();
    if(this.loggedIn == null) {
      this.typeUser = '';
    }
    else {
      this.typeUser = this.loggedIn.type
    };
  }

  isLoggedIn(){
    this.loggedIn = this.userService.isLoggedIn();
    this.typeUser = this.loggedIn.type;
  }
  
  logout() {
    this.userService.logout();
    this.loggedIn = null;
    this.typeUser = '';
  }

  type(){
    if(this.typeUser==null) return '';
    else return this.typeUser;
  }

  reloadCurrentPage() {
    window.location.reload();
  }

}