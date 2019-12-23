import { Router } from '@angular/router';
import { AuthService } from "./../_services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    // if (this.authService.loggedIn()) {
    //   this.router.navigate(['/members']);
    // }
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  cancelRegister(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
