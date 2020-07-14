import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { UserInterface } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) {}


  registerUser(email: string, psw: string) {
    return new Promise( (resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, psw)
        .then( userData => {
          resolve(userData),
          this.updateUserData(userData.user)
        }).catch( err => console.log( reject(err) ) )
    });
  }

  async register(email: string, pass: string) {
    try {
      return await this.afsAuth.createUserWithEmailAndPassword(email,pass);
    } catch (error) {
      console.log('error', error)
    }
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise( (resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  async login(email: string,pass: string) {
    try {
      return await this.afsAuth.signInWithEmailAndPassword(email,pass);
    } catch (error) {
      console.log('error', error)
    }
  }


  async loginFacebookUser() {
    try {
     let credential =  await this.afsAuth.signInWithPopup(new auth.FacebookAuthProvider());
     console.log('credential', credential);
    } catch (error) {
      console.log('error', error)
    }
  }


  async loginGoogleUser() {
    const credential = await this.afsAuth.signInWithPopup(new auth.GoogleAuthProvider());
    return await this.updateUserData(credential.user);
  }


  logoutUser() { return this.afsAuth.signOut(); }

  async logout() { 
    try {
      await this.afsAuth.signOut();
    } catch (error) {
      console.log('error', error)
    }
   }

  isAuth() {
    return this.afsAuth.authState.pipe( map( auth => auth ) );
  }

  private updateUserData(user){
    
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);

    // Inicializar los usuarios como administradores
    const data: UserInterface = {
      id: user.id,
      email: user.email,
      roles:{
        admin: true
      }
    }

    // Inicializar los usuarios como editor
    // const data: UserInterface = {
    //   id: user.id,
    //   email: user.email,
    //   roles:{
    //     editor: true
    //   }
    // }

    // const data: UserInterface = {
    //   id: user.id,
    //   email: user.email,
    //   roles:{
    //     admin: false
    //   }
    // }

    return userRef.set(data,{merge: true});
  }


  isUserAdmin(userId){
    return this.afs.doc<UserInterface>(`users/${userId}`).valueChanges();
  }

}
