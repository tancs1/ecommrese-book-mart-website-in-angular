import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{FormGroup, FormControl, Validators} from '@angular/forms'
import { AuthServiceService } from 'src/app/core/auth-service.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  containerActive: boolean = false;
  constructor( private messageService: MessageService,private router:Router,public authService:AuthServiceService){}
  formValue: string = '';
SignInFormData:any[]=[]
SignUpFormData:any[]=[]
 isSignIn:boolean=false
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



SignUp(){
  debugger
  this.SignUpFormData.push(this.SignUpForm.value)
console.log(this.SignUpFormData);
localStorage.setItem('SignUp',JSON.stringify(this.SignUpFormData))

}
showInfo() {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successfully' });
}
showError() {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credential not Correct SignUp and than Continue!' });
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
        this.showInfo()
        const delayedPromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve('Delayed action!');
          }, 1000);
        });
    
        // Handle the Promise
        delayedPromise.then((result) => {
          this.signInForm.reset()
          this.authService.loginshow=false
          this.router.navigate([''])
          // Your code to be executed after the delay
          console.log(result);
        });
        console.log('user Match');
        // this.isSignIn=true
      
      }else{
      this.showError()
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
