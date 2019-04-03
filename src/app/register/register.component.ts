import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formData = {
    email: null,
    password: null
  };

  error: any;

  constructor(public db: FirebaseService, public route: Router) {}

  ngOnInit() {}

  register() {
    this.db.signUp(this.formData).then(
      res => {
       this.route.navigate(['dashboard']);
      },
      err => {
        console.log('error: ' + err);
      }
    );
  }

}
