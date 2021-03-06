import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from "../../../models/user.interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {
    displayName: '',
    email: '',
    photoURL: ''
  };

  public providerId: string = 'null';

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
    this.AuthService.isAuth().subscribe( user => {
      if(user){
        this.user.displayName = user.displayName;
        this.user.email = user.email;
        this.user.photoURL = user.photoURL;
        this.providerId = user.providerData[0].providerId;

        // console.log('User : ',user);
      }
    });
  }

}
