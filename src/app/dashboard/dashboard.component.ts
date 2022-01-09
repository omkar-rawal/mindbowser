import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apicall/apiservice.service';
import { Employeeclass } from '../employeeclass';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formval: any = FormGroup;    ////initilize form
  allemployee: any = "";    /////for geting form value store zero
  employeeobj: Employeeclass = new Employeeclass;   /////new object for performing employee crud operation
  showaddbtn!: boolean;
  showupdatebtn!: boolean;
  submitted = false;
  futureDateError!: boolean;

  /////Inject the service here
  constructor(private _formbuilder: FormBuilder, private _apiservice: ApiserviceService, private _router: Router) { }

  //////////////Building Form values//////
  ngOnInit(): void {
    this.formval = this._formbuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      birthdate: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
    })
    this.getallemployee()    ///////refresh the form 
  }
  addempform() {
    this.formval.reset();       /////////reset all form fields
    this.showaddbtn = true;
    this.showupdatebtn = false;
  }
  /////////Using post method add employee list to database
  addemp() {
    this.submitted = true;

    if (this.formval.invalid) {
      return;
    }
    this.employeeobj.firstname = this.formval.value.firstname;
    this.employeeobj.lastname = this.formval.value.lastname;
    this.employeeobj.address = this.formval.value.address;
    this.employeeobj.birthdate = this.formval.value.birthdate;
    this.employeeobj.mobile = this.formval.value.mobile;
    this.employeeobj.city = this.formval.value.city;

    this._apiservice.postemployee(this.employeeobj).subscribe(res => {
      // console.log(res);
      alert("Employee Added Successfully");

      let clerarbtn = document.getElementById('clear');
      clerarbtn?.click();
      this.formval.reset();       /////////reset all form fields
      this.getallemployee();      /////////showing refresh all employee list
    },
      err => {
        alert("Somthing is Wrong");   ////////if any server side error then show below message
      })
  }

  //////////////Get all employee in table
  getallemployee() {
    this._apiservice.getemployee().subscribe(res => {
      this.allemployee = res;
      //  console.log('ok-'+res)
    })
  }

  ///////Delete operation for acrion button employee table
  deleteempdata(data: any) {
    if(confirm("Are you sure to delete "+data.firstname)) {
    this._apiservice.deletemployee(data.id).subscribe(res => {
      alert('Employee Record Deleted Successfully');
      this.getallemployee()
    })
  }
  }

  ///////edit operation for acrion button employee table
  editemp(data: any) {
    this.showaddbtn = false;
    this.showupdatebtn = true;
    this.employeeobj.id = data.id;
    this.formval.controls['firstname'].setValue(data.firstname)
    this.formval.controls['lastname'].setValue(data.lastname)
    this.formval.controls['address'].setValue(data.address)
    this.formval.controls['birthdate'].setValue(data.birthdate)
    this.formval.controls['mobile'].setValue(data.mobile)
    this.formval.controls['city'].setValue(data.city)
  }


  updateemp() {
    this.submitted = true;

    if (this.formval.invalid) {
      return;
    }
    ///////////store current table value to form field
    this.employeeobj.firstname = this.formval.value.firstname;
    this.employeeobj.lastname = this.formval.value.lastname;
    this.employeeobj.address = this.formval.value.address;
    this.employeeobj.birthdate = this.formval.value.birthdate;
    this.employeeobj.mobile = this.formval.value.mobile;
    this.employeeobj.city = this.formval.value.city;

    ///////////using employee id update the value here
    if(confirm("Are you sure to update record")) {
    this._apiservice.updateemployee(this.employeeobj, this.employeeobj.id).subscribe(res => {
      alert('Employee Record Updated Successfully');
      let clerarbtn = document.getElementById('clear');
      clerarbtn?.click();
      this.formval.reset();
      this.getallemployee()
    })
  }
  }

  clearformemp() {
    this.formval.reset();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.formval.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.formval.reset();
  }
  logout() {
    //alert('Logout your ');
    localStorage.removeItem('SeesionUser');
    this._router.navigate(['login'])

  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
}
