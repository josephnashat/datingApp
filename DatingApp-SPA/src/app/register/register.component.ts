import { AuthService } from "./../_services/auth.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegisterMode = new EventEmitter();
  model: any = {};
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  register() {
    console.log(this.model);
    this.authService.register(this.model).subscribe(
      () => {
        console.log("registered succesfully");
      },
      error => console.log(error)
    );
  }

  cancel() {
    this.cancelRegisterMode.emit(false);
    console.log("cancelled");
  }
}
