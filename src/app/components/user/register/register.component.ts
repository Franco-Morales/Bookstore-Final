import { Component,OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from 'rxjs';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // public email: string = '';
  // public psw: string = '';
  regForm: FormGroup;

  uploadPercent: Observable <number> ;
  urlImage: Observable <string> ;

  @ViewChild('imageUser',{ static: false, }) inputImageUser: ElementRef;


  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {}
  //password = pswd
  private buildForm(){
    this.regForm = this.formBuilder.group({
      userName: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      pswd: ['',[Validators.required]] 
    });
  }

  onUpload(e) {
    // console.log('subir',e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/profile_${id}`;
    const ref = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize( () => this.urlImage = ref.getDownloadURL() ) ).subscribe(); 
  }


  onAddUser(event: Event) {
    event.preventDefault();
    if(this.regForm.valid){
      this.authService.register(this.regForm.value.email, this.regForm.value.pswd)
      .then( (resp) => {
        this.authService.isAuth().subscribe( user => {
          if(user) {
            user.updateProfile({
              displayName: this.regForm.value.userName,
              photoURL: this.inputImageUser.nativeElement.value
            })
            .then( (data) => {console.log('data', data); this.onRegisterRedirect()} )
            .catch( (error) => console.log('error : ',error) );
          }
        });
      } )
      .catch(err => console.log('Error :', err.message));
    } else {
      this.regForm.markAllAsTouched();
    }
  }

  onLoginGoogle():void{
    this.authService.loginGoogleUser()
    .then((res)=>{
      this.onRegisterRedirect();
    }).catch(err => console.log("err",err.message));
    
  }

  onLoginFacebook(): void{
    this.authService.loginFacebookUser()
    .then((res)=>{
      this.onRegisterRedirect();
    }).catch( err => console.log("err",err.message));
  }

  onRegisterRedirect(): void {
    this.router.navigate(['/user/profile']);
  }


  //Solo para las validaciones
  get emailField(){
    return this.regForm.get('email');
  }
  get pswdField(){
    return this.regForm.get('pswd');
  }
  get nameField(){
    return this.regForm.get('userName');
  }
}
