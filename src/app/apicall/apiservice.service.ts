import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http: HttpClient) {
  }
  /////Post Employee Data////
  postemployee(data: any) {
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res: any) => {
      return res
    }));
  }
  /////get Employee Data////
  getemployee() {
    return this._http.get("http://localhost:3000/posts").pipe(map((res: any) => {
      return res;
    }))
  }
  /////edit Employee Data////
  updateemployee(data: any, id: number) {
    return this._http.put("http://localhost:3000/posts/" + id, data).pipe(map((res: any) => {
      return res;
    }))
  }
  /////delete Employee Data////
  deletemployee(id: any) {
    // alert(id);
    return this._http.delete("http://localhost:3000/posts/" + id).pipe(map((res: any) => {
      return res;
    }))
  }
  gettoken(){  
    return !!localStorage.getItem("SeesionUser"); 
    //alert("abc-"+localStorage.getItem("SeesionUser")) ;
    } 
}
