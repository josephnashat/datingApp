import { AuthService } from "./../../_services/auth.service";
import { UserService } from "./../../_services/user.service";
import { AlertifyService } from "./../../_services/alertify.service";
import { User } from "./../../_models/user";
import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"]
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm", { static: true }) editForm: NgForm;
  user: User;
  photoUrl: string;
  @HostListener("window:beforeunload", ["$event"])
  onWindowClose(event: any): void {
    if (this.editForm.dirty) {
      event.preventDefault();
      event.returnValue = false;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.authService.currentPhotoUrl.subscribe(
      photoUrl => (this.photoUrl = photoUrl)
    );
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        next => {
          this.alertify.success("profile updated succesfully");
          this.editForm.reset(this.user);
        },
        error => this.alertify.error(error)
      );
  }
}
