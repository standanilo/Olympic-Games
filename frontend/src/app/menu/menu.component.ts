import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  reload : boolean = false;
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

  type(){
    if(this.typeUser==null) return '';
    else return this.typeUser;
  }

  go(text){
    this.router.navigate([text])
  }

}
