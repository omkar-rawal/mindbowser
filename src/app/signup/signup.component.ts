import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
signupform: any =FormGroup;
submitted = false;

  constructor(private _fb:FormBuilder, private _http:HttpClient, private _router:Router) { }

  ngOnInit(): void {
    this.signupform =this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40)
      ]],
      address: ['', Validators.required],
      birthdate: ['', Validators.required],
      city: ['', Validators.required],
    })
  }
  signupadd(){
    this.submitted = true;

    if (this.signupform.invalid) {
      return;
    }
    this._http.post<any>("http://localhost:3000/signup",this.signupform.value).subscribe(res=>{
    alert("Registration Successfully");
    this.signupform.reset();
    this._router.navigate(['login']);
    }, err=>{
      alert("Something wrong...");
    })

  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupform.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.signupform.reset();
  }


}
