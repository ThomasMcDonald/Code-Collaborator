import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService, TokenPayload } from '../services/authentication/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, public auth: AuthenticationService) { }

  ngOnInit() {
  }

  roomGenerate() {
    this.http.get('http://localhost:3000/generateRoom') // Sending password with no hash ;)
     .subscribe(
       res => {
         console.log(res)
         this.router.navigate([res['_roomID']]);
       },
       err => {
         console.log("Error occured");
       }
     );

  }

}
