import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  standalone:true,
  selector: 'app-user-login',
  imports:[ReactiveFormsModule, CommonModule],  
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;

    constructor(
      private fb:FormBuilder,
      private http:HttpClient,
      private router:Router
    ) {
  
    }

    ngOnInit(): void {
      this.userForm = this.fb.group({
        email:'',
        password:"",
      });
    }

  get f() { return this.userForm.controls; }

  submit(): void {
    this.submitted = true;

    let user = this.userForm.getRawValue()

    if (user.email == "" || user.password == "") {
      Swal.fire("Error", "Please Enter All the fields", "error")
    }
    else {
      this.http.post("http://localhost:5000/api/login", user, {
        withCredentials: true
      })
        .subscribe(() => this.router.navigate(['/']), (err) => {
          Swal.fire("Error", err.error.message, "error")
        })
    }
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    console.log(user);
  }
}
