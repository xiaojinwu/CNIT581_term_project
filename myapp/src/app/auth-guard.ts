import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard  implements CanActivate {
  
    constructor(private router: Router) { }    

  canActivate(){
    // if there is a token in local storage, return true
    // else return false
    // return true;
    let token = localStorage.getItem("jwt");
    if (token) 
    return true;
    else
    {
        // redirect to login page
        this.router.navigate(['/Account']); 
        return false;

    } 
     
  }

}
