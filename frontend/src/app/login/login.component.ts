import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  message: string;

  signIn(){
    this.userService.signInService(this.username, this.password).subscribe((user:User)=>{
      if(user){
        localStorage.setItem('loggedIn', JSON.stringify(user));
        this.router.navigate(['menu']).then(() => {
          window.location.reload();
        });
      }
      else{
        this.message='Error while logging in!';
      }
    })
  }

}
