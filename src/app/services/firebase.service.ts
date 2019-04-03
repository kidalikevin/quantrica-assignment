import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FileUpload } from '../models/upload';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  authState: any = null;
  private dbPathProducts = 'cars';
  operationRefProducts: AngularFireList<FileUpload> = null;
  userID: string;

  constructor(public af: AngularFireAuth, private db: AngularFireDatabase) {
    this.operationRefProducts = db.list(this.dbPathProducts);

    this.af.authState.subscribe(auth => {
      this.authState = auth;

      if (this.authState != null) {
        this.userID = this.authState.uid;
      }
    });
  }

  async signUp(data: any) {
    const results = await this.af.auth.createUserWithEmailAndPassword(
      data.email,
      data.password
    );
    return results;
  }

  signIn(data: any) {
    return new Promise<any>((reject, resolve) => {
      this.af.auth
        .signInWithEmailAndPassword(data.email, data.password)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.af.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged(userInfo => {
        if (userInfo) {
          resolve(userInfo);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  getProducts(): AngularFireList<FileUpload> {
    return this.operationRefProducts;
  }

  getSingleProduct(key) {
    return this.db.list('/cars', ref => {
      const q = ref.orderByKey().equalTo(key);
      return q;
    });
  }

  updateProduct(key: string, value: any): void {
    this.operationRefProducts
      .update(key, value)
      .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
