import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.models";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm:FormGroup
  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = "";
  selectedImage: File | null = null;

  constructor(private authenticationService: AuthenticationService,private authService:AuthService, private router: Router,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
    this.registerForm = this.formbuilder.group({
 // Assurez-vous que les noms correspondent à ceux de votre formulaire HTML
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      adresse: ['', Validators.required],
      // Pour les champs de type fichier, vous devez les traiter séparément, car `Validators` ne peut pas être appliqué directement
    });
  }

  register() {
    this.authenticationService.Register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Username already exist.';
      } else {
        this.errorMessage = 'Unexpected error occurred.';
        console.log(err);
      }
    })
  }
  handleFileInput(event: Event) {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files) {
      this.selectedImage = files.item(0);
    }
  }
  
  register1() {
    console.log('Email:', this.registerForm.value.email);
    console.log('Username:', this.registerForm.value.username);
    const formData = new FormData();

    formData.append('username', this.registerForm.value.username);
    formData.append('email', this.registerForm.value.email);
    formData.append('password', this.registerForm.value.password);
    formData.append('phone', this.registerForm.value.phone);
    formData.append('adresse', this.registerForm.value.adresse);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }
  
    this.authenticationService.signup(formData).subscribe(
      response => {
        console.log(response);
        this.router.navigateByUrl("/login");
      },
      error => {
        console.error(error);
      }
    );
  }
  




}
