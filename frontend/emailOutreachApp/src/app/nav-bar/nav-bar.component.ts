import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitter';

@Component({
  standalone:false,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  authenticated = false;

  constructor(private http:HttpClient) {}


  ngOnInit(): void{
    Emitters.authEmitter.subscribe((auth:boolean) => {
      console.log(auth)
      this.authenticated = auth
    })
  }

  logout(): void {
    this.http.post('http://localhost:5000/api/logout', {},
      {
        withCredentials:true
      }
    ).subscribe(()=>{
      this.authenticated = false
    })
  }
}
