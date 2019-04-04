import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
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

btn = 'LOGIN';

  error: any;

  constructor(public db: FirebaseService, public router: Router) {}

  ngOnInit() {}

  login() {
    this.btn = 'PROCESSING ..';
    this.db.signIn(this.formData).then(
      res => {
        this.btn = 'LOGIN FAILED!';
        setTimeout(() => {
          this.btn = 'LOGIN';
        }, 4000);
        this.router.navigate(['/login']);
      },
      err => {
        this.router.navigate(['/dashboard']);
      }
    );
  }
}
