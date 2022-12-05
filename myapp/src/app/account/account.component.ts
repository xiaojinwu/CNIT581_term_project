import { Component, Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
@Injectable()
export class AccountComponent implements OnInit {

  model: User =new User;
  constructor(public http:HttpClient, public router : Router ) { }

  ngOnInit(): void {
    this.model.username = "jinwu";
    this.model.password = "qwe123";
  }

  login() {
    console.log(this.model);
    // request to server to generate and return a JWT http://cnit581demo.jinwu.me/api-token-auth/
    // store JWT in local storage
    // redirect to main page
    this.http.post('http://cnit581demo.jinwu.me:8000/api-token-auth/', this.model).subscribe(
      (data:any) => {
        console.log(data);
        if(data.token){
          localStorage.setItem("jwt", data.token);
          this.router.navigate(['/main']);
         
        } 
         
      },(error) => {
        alert(error.error.non_field_errors[0]);
      }
    );


  }

}



// Define a model for Django's User model
export class  User {
  id: number;
  username: string;
  email: string;
  password: string;
}


