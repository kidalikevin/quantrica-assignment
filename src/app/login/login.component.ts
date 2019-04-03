import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData = {
    email: null,
    password: null
  };

  error: any;

  constructor(public db: FirebaseService, public Router: Router) {}

  ngOnInit() {}

  login() {
    this.db.signIn(this.formData).then(
      res => {
        this.Router.navigate(['/login']);
      },
      err => {
        this.Router.navigate(['/dashboard']);
      }
    );
  }
}
