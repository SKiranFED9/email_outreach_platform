import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  standalone:true,
  selector: 'app-register-user',
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router
  ) {

  }

  ngOnInit():void {
    this.form = this.fb.group({
      name:['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['', [Validators.required, Validators.minLength(6)]]
    })
  }

     // convenience getter for easy access to form fields
     get f() { return this.form.controls; }

  submit(): void {

    this.submitted = true;

    let user = this.form.getRawValue()

    if (user.name == "" || user.email == "" || user.password == "") {
      Swal.fire("Error", "Please Enter All the fields", "error")
    }
    else{
      this.http.post("http://localhost:5000/api/register", user, {
        withCredentials: true
      })
      .subscribe(()=> this.router.navigate(['/']), (err) => {
        Swal.fire("Error", err.error.message, "error")
      })
    }
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }


    console.log(user);
  }

}
