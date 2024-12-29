import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitter';

@Component({
  standalone:true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message = "";

  constructor(
    private http: HttpClient

  ) {
  }

  ngOnInit(): void {
    this.http
    .get('http://localhost:5000/api/user', {
      withCredentials: true
    })
    .subscribe((res: any) => {
      this.message = `Hi ${res.name}`; 
      Emitters.authEmitter.emit(true)
    },
    (err) =>  {
      this.message = "You are not logged In";
      Emitters.authEmitter.emit(false)
    }
  );
  }

}
