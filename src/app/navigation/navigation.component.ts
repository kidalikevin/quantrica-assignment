import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedIn = false;

  constructor(private fireApi: FirebaseService, private route: Router) { }

  ngOnInit() {
    if (this.fireApi.authState) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  logout() {
    this.fireApi.logout();
  }

  home() {
    this.route.navigate(['/']);
  }

  dashboard() {
    this.route.navigate(['dashboard']);
  }

  signUp() {
    this.route.navigate(['register']);
  }

  signIn() {
    this.route.navigate(['login']);
  }

}
