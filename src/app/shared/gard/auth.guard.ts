import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/core/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('authgard canactive called');
    debugger;

    // if(this.authService.authenticateUser()){
    //   console.log('user authenticate');
    //   // this.router.navigate([''])

    //   return true
      
    // }else{
    //   console.log('user not authenticate');
    //   this.router.navigate(['login'])
    //   alert('not authenticate')
    //   return false
    // }



    
    let isAuthenticate = localStorage.getItem('LoginUser')
    // console.log(isAuthenticate);
    if (isAuthenticate !== null) {
      let getdata = JSON.parse(isAuthenticate);
      console.log(getdata);
    
    if (getdata) {
      this.authService.islogin=true
    //  alert('login successful')
//  this.authService.getIsAuthenticated()  
      // this.router.navigate([''])
      return true
    } else {
      this.authService.islogin=false
      this.router.navigate(['login'])
      return false
    }
  }else{
    this.router.navigate(['login'])
      return false
  
  }
}
}
