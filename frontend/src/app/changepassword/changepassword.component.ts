import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedIn'));
  }

  changeForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*].*[!@#$%^&*])(?=(?:[^a-z]*[a-z]){3})(?=.*[A-Z])(?!.*(.)\\1{3})[a-zA-Z].{7,11}$')])
  })

  get username(){return this.changeForm.get('username')}
  get password(){return this.changeForm.get('password')}
  get newPassword(){return this.changeForm.get('newPassword')}

  message: string;

  user: User;

  change(){
    if(this.user){
      if(this.user.username==this.username.value){
        if(this.user.password==this.password.value){
          this.userService.signInService(this.username.value, this.password.value).subscribe((data: User)=>{
            if(data){
              if(this.password.value==this.newPassword.value){
                this.message = "New password can't be old password"
              }
              else {
                this.userService.changePassword(this.username.value, this.password.value, this.newPassword.value).subscribe((res)=>{
                  if(res['message']!='ok'){
                    alert('Error')
                  }
                  else{
                    this.logout();
                    this.message = ''
                    this.router.navigate(['login']);
                  }
                })
              }
            }
            else {
              this.message = 'Wrong password or username'
            }
          })
        }
        else {
          this.message = 'Wrong password entered'
        }
      }
      else {
        this.message = 'Wrong username entered'
      }
    }
    else {
      this.userService.signInService(this.username.value, this.password.value).subscribe((data: User)=>{
        if(data){
          if(this.password.value==this.newPassword.value){
            this.message = "New password can't be old password"
          }
          else {
            this.userService.changePassword(this.username.value, this.password.value, this.newPassword.value).subscribe((res)=>{
              if(res['message']!='ok'){
                alert('Error')
              }
              else{
                this.message = ''
                this.router.navigate(['login']);
              }
            })
          }
        }
        else {
          this.message = 'Wrong password or username'
        }
      })
    }
  }

  logout() {
    this.userService.logout();
  }
  
}
