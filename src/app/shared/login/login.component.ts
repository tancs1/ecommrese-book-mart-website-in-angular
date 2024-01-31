import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{FormGroup, FormControl, Validators} from '@angular/forms'
import { AuthServiceService } from 'src/app/core/auth-service.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent {
  containerActive: boolean = false;
  constructor( private toastr: ToastrService,private router:Router,public authService:AuthServiceService){}
  formValue: string = '';
SignInFormData:any[]=[]
SignUpFormData:any[]=[]
//  isSignIn:boolean=false
loginuserDetails:[]=[]
SignUpForm = new FormGroup({
  SignUpName: new FormControl('', []),
  SignUpEmail: new FormControl('', [Validators.required, Validators.email]),
  SignUpPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
});

signInForm = new FormGroup({
  SignInEmail: new FormControl('', [Validators.required, Validators.email]),
  SignInPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
});



SignUp() {
  debugger;

  // Retrieve existing data from local storage
  const storedSignUpData = localStorage.getItem('SignUp');
  const existingSignUpData: any[] = storedSignUpData ? JSON.parse(storedSignUpData) : [];

  // Generate a unique ID for the new user
  const uniqueId = this.generateUniqueId();

  // Push the new user data with the unique ID to the existing array
  const newUser = { id: uniqueId, ...this.SignUpForm.value };
  existingSignUpData.push(newUser);

  // Store the updated data back to local storage
  localStorage.setItem('SignUp', JSON.stringify(existingSignUpData));

  console.log(existingSignUpData);
}

generateUniqueId() {
  // This is a simple example; you may want to use a more robust method
  // to generate unique IDs in a real-world application
  return '_' + Math.random().toString(36).substr(2, 9);
}



SignIn(){
  
let LoginEmail=this.signInForm.get('SignInEmail')?.value
let LoginPassword=this.signInForm.get('SignInPassword')?.value
  console.log(LoginEmail,LoginPassword);
  
  
 
 
    const storedSignUpData = localStorage.getItem('SignUp');
    
    
    if (storedSignUpData) {
       debugger
      const signUpData: [] = JSON.parse(storedSignUpData);

      const matchingUser = signUpData.find((user: any) => {
        
        return user.SignUpEmail === LoginEmail && user.SignUpPassword === LoginPassword;
        
      });
      console.log(matchingUser);
  
   
 
      if (matchingUser) {
        this.loginuserDetails.push(matchingUser)
        localStorage.setItem('LoginUser',JSON.stringify( this.loginuserDetails))
    this.toastr.success('You Login Successfully')
  
        console.log('user Match');
        this.authService.islogin=true
        this.signInForm.reset()
          this.authService.loginshow=false
          this.router.navigate([''])
      }else{
     this.toastr.error('Login Detailes not match')
        localStorage.setItem('LoginUser',(''))
        // this.isSignIn=false
        console.log('user not match');
        // alert('not match')
        // this.router.navigate(['/login'])
      }
     
    }
}


backHome(){
  this.authService.loginshow=false
}


 
  toggleContainer() {
    this.containerActive = !this.containerActive;
  }

}
