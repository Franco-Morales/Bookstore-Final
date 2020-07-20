import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from '@angular/router';
import {  AuthService } from "../../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public email:string = '';
  // public psw:string = '';
  loginForm: FormGroup;

  constructor(private router: Router, private authService:AuthService, private formBuilder: FormBuilder) { 
    this.buildForm();
  }

  ngOnInit() {
  }

  /**
   * Form builder (async)
   */
  private buildForm(){
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      pswd: ['',[Validators.required]] //password
    });
  }
  /**
   * Login por Email y Contraseña
   */
  onLogin(event: Event){
    event.preventDefault();

    if(this.loginForm.valid){
        this.authService.login(this.loginForm.value.email,this.loginForm.value.pswd)
          .then( res => this.onLoginRedirect())
          .catch( error => console.log(`error : ${error.message}`))
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onLoginGoogle():void{
    this.authService.loginGoogleUser()
      .then((res)=>{
        this.onLoginRedirect();
      })
      .catch( error => console.log(`error : ${error.message}`));
    
  }

  onLoginFacebook(): void{
    this.authService.loginFacebookUser()
      .then((res)=>{
        this.onLoginRedirect();
      })
      .catch( error => console.log(`error : ${error.message}`));
  }

  
  onLogout(){
    this.authService.logout();
  }

  onLoginRedirect(): void{
    this.router.navigate(['/user/profile']);
  }


  //Solo para las validaciones
  get emailField(){
    return this.loginForm.get('email');
  }
  get pswdField(){
    return this.loginForm.get('pswd');
  }
}
