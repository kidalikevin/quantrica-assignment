import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Users } from '../models/users';
import { UserServiceService } from './user-service.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<Users> {

  constructor(
    public userService: UserServiceService,
    private fireApi: FirebaseService,
    private router: Router) { }


  resolve(route: ActivatedRouteSnapshot) : Promise<Users> {

    let user = new Users();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
  
        user.emailAddress = res.email;
        // user.memberType = 'PETERSON';
        user.userID = res.uid;
        // console.log(res.uid)
        return resolve(user);
        // if(res.providerData[0].providerId == 'password'){
        //   user.name = res.displayName;
        //   user.emailAddress = res.emailAddress;
        //   user.provider = res.providerData[0].providerId;
        //   return resolve(user);
        // }
        // else{
        //   user.image = res.photoURL;
        //   user.name = res.displayName;
        //   user.provider = res.providerData[0].providerId;
        //   return resolve(user);
        // }
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }

}
