import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from './apicall/apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationurlGuard implements CanActivate {
  constructor(private _apiservice: ApiserviceService, private router:Router){}
  canActivate(): boolean {  
    //alert("test-"+localStorage.getItem("SeesionUser")) ;
    if (!this._apiservice.gettoken()) {  
        this.router.navigateByUrl("/login");  
    }  
    return this._apiservice.gettoken();  
}
  
}
