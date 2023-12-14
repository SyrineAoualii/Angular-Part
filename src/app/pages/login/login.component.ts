import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.models";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import { TokenService } from 'src/app/services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string;
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    const userConnect = localStorage.getItem("userconnect");
    // if (userConnect) {
    //   this.userconnect = JSON.parse(userConnect);
    //   console.log(this.userconnect.id);
    // } else {
    //   console.log('No user connected data in local storage.');
    // }
    console.log(this.userconnect)
  }

  login() {

    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log(response);
          console.log(response.userRole);
          this.tokenService.setToken(response.token);
          console.log('Logged in successfully.');
          if(response.enabled==true){
          // Store user details in localStorage
          localStorage.setItem("userconnect",JSON.stringify(response))
          localStorage.setItem('userRole', response.userRole);
          localStorage.setItem('userId', response.id);
          localStorage.setItem('username', response.username);
          localStorage.setItem('useremail', response.email);
          localStorage.setItem('userimage', response.image);}

          // Redirect based on user role
          // Uncomment and adjust the following lines as per your routing logic
          // if (response.userRole === 'USER') {
          //   this.router.navigate(['/profile']);
          // } else if (response.userRole === 'ADMIN') {
          //   this.router.navigate(['/orgadmin']);
          // } else {
            if(response.userRole=='USER'){
            this.router.navigate(['/profile']);}
          // }
        },
        err => {
          this.errorMessage = 'Username or password is incorrect.';
          console.error(err);
        }
      );
    } else {
      this.errorMessage = 'Please fill in the form correctly.';
    }
  }
  estuser():any{
    if(this.userconnect.roles[0]=="ROLE_USER"){
      return true;}
      else{
        return false;
      }
  }
  SignIn(){
    this.authenticationService.signin(this.loginForm.value).subscribe((res:any)=>{
      console.log("reponse",res)

      if(res.enabled==true){
        localStorage.setItem("userconnect",JSON.stringify(res))
        localStorage.setItem('userRole', res.userRole);
        localStorage.setItem('useremail', res.email);
        localStorage.setItem('username', res.username);
        localStorage.setItem('userId', res.id);
        localStorage.setItem('userimage', res.image);}
        this.router.navigateByUrl("/profile")
      })

    }
    // err=>{
    //   Swal.fire({
    //     icon:'error',
    //     title:'user not found',
    //     text:'email invalid',
    //     footer:'password invalid'
    //   })
    //   console.log(err)

    // }
    
  }

