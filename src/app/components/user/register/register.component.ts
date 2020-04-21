import { Component,OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from 'rxjs';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email: string = '';
  public psw: string = '';
  uploadPercet: Observable <number> ;
  urlImage: Observable <string> ;

  @ViewChild('imageUser',{static:false}) inputImageUser: ElementRef;


  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) {}

  ngOnInit() {}

  onUpload(e) {
    // console.log('subir',e.target.files[0]);

    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/profile_${id}`;
    const ref = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, file);

    this.uploadPercet = task.percentageChanges();
    task.snapshotChanges().pipe( finalize( ()=> this.urlImage = ref.getDownloadURL() ) ).subscribe();

  }


  onAddUser() {
    this.authService.registerUser(this.email, this.psw)
      .then((resp) => {
        this.authService.isAuth().subscribe( user=>{
          if(user){
            user.updateProfile({
              displayName: '',
              photoURL: this.inputImageUser.nativeElement.value
            }).then( () =>{ 
              this.router.navigate(['admin/list-book']); 
            }).catch( (error)=> { console.log('Error : ',error); });
          }
        });
      }).catch(err => console.log('Error :', err.message));
  }

  /**
   * Login por Google
   */
  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((resp) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));

  }

  /**
   * Login por Facebook
   */
  onLoginFacebook() {
    // this.authService.loginFacebookUser()
    // .then((resp)=>{
    //   this.onLoginRedirect();
    // }).catch( err=> console.log('err',err.message));
  }

  onLoginRedirect(): void {
    this.router.navigate(['admin/list-book']);
  }

}
