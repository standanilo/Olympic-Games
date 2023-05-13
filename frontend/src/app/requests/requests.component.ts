import { Component, OnInit } from '@angular/core';
import { Requests } from '../models/requests';
import { RequestsService } from '../requests.service';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private requestsService: RequestsService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.requestsService.searchAllRequests().subscribe((data: Requests[])=>{
      this.requests = data;
      this.message1 = ''
      this.message2 = ''
    })
  }

  requests: Requests[];
  message1: string;
  message2: string;
  user: User = new User();

  addUser(){
    this.requestsService.searchRequest(this.user1.value).subscribe((data: Requests)=>{
      this.user.username = data.username;
      this.user.firstname = data.firstname;
      this.user.lastname = data.lastname;
      this.user.country = data.country;
      this.user.mail = data.mail;
      this.user.password = data.password;
      this.user.type = data.type;
      this.requestsService.removeRequest(this.user1.value).subscribe((data: Requests)=>{
        this.message1 = data.username + ' - zahtev izbrisan'
      })
      if(this.user.type=='nat_delegate'){
        this.userService.searchCountry(this.user.country).subscribe((user:User)=>{
          if(user){
            this.message1 = 'There is already a head of the national delegation for ' + this.user.country + '.';
            return;
          }
        })
      }
      this.userService.registerUserService(this.user.username, this.user.password, this.user.firstname, this.user.lastname, this.user.country, this.user.mail, this.user.type).subscribe(response=>{
        if(response['message']=='user added'){
          alert('User registered')
        }
      })
      this.reloadCurrentRoute()
    })
  }

  removeUser(){
    this.requestsService.removeRequest(this.user2.value).subscribe((data: Requests)=>{
      this.message2 = data.username + ' - zahtev izbrisan';
      alert('User request removed')
    })
    this.reloadCurrentRoute()
  }
  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

  requestForm1 = new FormGroup({
    user1: new FormControl('', Validators.required)
  })

  requestForm2 = new FormGroup({
    user2: new FormControl('', Validators.required)
  })

  get user1(){return this.requestForm1.get('user1')}
  get user2(){return this.requestForm2.get('user2')}
}
