import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../services/firebase.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(public db: FirebaseService, public route: Router) {}

  ngOnInit() {}

  logout() {
    this.db.logout().then(
      res => {
        this.route.navigate(["/login"]);
        console.log(res);
      },
      error => {
        console.log("Logout error", error);
      }
    );
  }
}
