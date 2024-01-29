import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  loginshow:boolean=false
  constructor( private router:Router) { }
islogin:boolean=false
// comparedSignInData:any[]=[]
// loginEmail:any
// loginPassword:any
// comparedSignUpData:any[]=[]
// SignUpEmail:any
// SignUpPassword:any
// public isAuthenticated: boolean = false;


// getIsAuthenticated(): boolean {

//   const storedSignInData = localStorage.getItem('SignIn');
 
//   if(storedSignInData !== null){

//    let getsignData=JSON.parse(storedSignInData)
//    this.comparedSignInData.push(getsignData)
//   }
//   console.log(typeof(this.comparedSignInData));
  
//   this.comparedSignInData.map((item:any)=>{this.loginEmail=item.SignInEmail;
//     this.loginPassword=item.SignInPassword

//   })
//   console.log(this.loginEmail,this.loginPassword);



//   const storedSignUpData = localStorage.getItem('SignUp');
 
//   if(storedSignUpData !== null){

//    let getSignupdata=JSON.parse(storedSignUpData)
//    this.comparedSignUpData.push(getSignupdata)
//   }
//   console.log(typeof(this.comparedSignUpData));
//   this.comparedSignUpData.map((item:any)=>{this.SignUpEmail=item.SignUpEmail;
//     this.SignUpPassword=item.SignUpPassword

//   })
//   console.log(this.SignUpEmail,this.SignUpPassword);
  
//     if(this.SignUpEmail==this.loginEmail || this.SignUpPassword==this.loginPassword){
//       console.log('user Match');
//       //     // this.isSignIn=true
//           this.isAuthenticated=false
//       return true
//     }else{
//       this.isAuthenticated=true
//       return false
//     }
//   }







}
