import { Injectable } from '@angular/core';
import { map, switchMap } from "rxjs/operators";

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";

import { User } from '../models/user.interface';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword( email, password );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword( email, password );
      // this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async loginFacebookUser(){
    const credential = await this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
    return await this.updateUserData(credential.user);
  }

 async loginGoogleUser(){
   const credential = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
   return await this.updateUserData(credential.user);
  }

  async logout() { 
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('error', error)
    }
   }


  isAuth() {
    return this.afAuth.authState.pipe( map(auth => auth) );
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'EDITOR',
    };

    return userRef.set(data, { merge: true });
  }

  isUserAdmin(userId: string){
    return this.afs.doc<User>(`users/${userId}`).valueChanges();
  }

}
