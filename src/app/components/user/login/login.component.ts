import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from '@angular/router';
import {  AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:string = '';
  public psw:string = '';
  constructor(public afAuth: AngularFireAuth,private router: Router, private authService:AuthService) { }

  ngOnInit() {
  }

  
  /**
   * Login por Email y Contraseña
   */
  onLogin(): void{
    this.authService.loginEmailUser(this.email, this.psw)
    .then((resp)=>{
      this.onLoginRedirect();
    }).catch( err => console.log('err',err.message));
  }

  /**
   * Login por Google
   */
  onLoginGoogle(): void{
    this.authService.loginGoogleUser()
    .then((resp)=>{
      this.onLoginRedirect();
    }).catch( err => console.log('err',err.message));
    
  }

  /**
   * Login por Facebook
   */
  onLoginFacebook(){
    // this.authService.loginFacebookUser()
    // .then((resp)=>{
    //   this.onLoginRedirect();
    // }).catch( err=> console.log('err',err.message));
  }

  /**
   * 
   */
  onLogout(){
    this.authService.logoutUser();
  }

  onLoginRedirect(): void{
    this.router.navigate(['admin/list-book']);
  }
}
