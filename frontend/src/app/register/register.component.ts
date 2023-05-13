import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { User } from '../models/user';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private requestsService: RequestsService) { }

  ngOnInit(): void {
  }

  register(){
    if(this.type.value=='comp_delegate'){
      this.requestsService.registerRequestsService(this.username.value, this.password.value, this.firstname.value, this.lastname.value, this.country.value, this.mail.value, this.type.value).subscribe(response=>{
          if(response['message']=='request added'){
            alert('Request registered')
          }
        })
    }
    else if(this.type.value=='nat_delegate'){
      this.userService.searchCountry(this.country.value).subscribe((user:User)=>{
        if(user){
          this.message = 'There is already a head of the national delegation for ' + this.country.value + '.';
        }
        else{
          this.requestsService.registerRequestsService(this.username.value, this.password.value, this.firstname.value, this.lastname.value, this.country.value, this.mail.value, this.type.value).subscribe(response=>{
            if(response['message']=='request added'){
              alert('Request registered')
              this.message = ''
            }
          })
        }
      })
    }
  }

  message : string;

  // findUser(){
  //   this.userService.findUser().subscribe((user:User)=>{
  //     if(user){

  //     }
  //     else{
  //       this.message='Error while logging in!';
  //     }
  //   })
  // }

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*].*[!@#$%^&*])(?=(?:[^a-z]*[a-z]){3})(?=.*[A-Z])(?!.*(.)\\1{3})[a-zA-Z].{7,11}$')]),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('', Validators.required)
  })

  get username(){return this.registerForm.get('username')}
  get password(){return this.registerForm.get('password')}
  get firstname(){return this.registerForm.get('firstname')}
  get lastname(){return this.registerForm.get('lastname')}
  get country(){return this.registerForm.get('country')}
  get mail(){return this.registerForm.get('mail')}
  get type(){return this.registerForm.get('type')}

}
