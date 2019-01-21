import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  roomGenerate() {
    this.http.get('http://localhost:8080/generateRoom') // Sending password with no hash ;)
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
