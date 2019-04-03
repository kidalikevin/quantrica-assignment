import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserServiceService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        this.router.navigate(['/dashboard']);
        return resolve(false);
      }, err => {
        return resolve(true);
      })
    })
  }

}
