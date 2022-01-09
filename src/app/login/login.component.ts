import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: any = FormGroup;
  submitted = false;
  number="1";
  constructor(private _formbuilder: FormBuilder, private _http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.loginform = this._formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]],
    })
  }
  loginmanager() {
    this.submitted = true;

    if (this.loginform.invalid) {
      return;
    }

    console.log(JSON.stringify(this.loginform.value, null, 2));
    this._http.get<any>("http://localhost:3000/signup").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginform.value.email && a.password === this.loginform.value.password;
      })
      if (user) {
        localStorage.setItem('SeesionUser',this.number)  
        alert('Manager Login Successfully');
        //alert(localStorage.getItem("SeesionUser")) ;
        this.loginform.reset();
        this._router.navigate(['dashboard'])
      }
      else {
        alert("User Not Found");
      }
    }, err => {
      alert('Somrthing going Wrong');
    })
  }


  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.loginform.reset();
  }

}
