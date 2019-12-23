import { UserService } from "./../../_services/user.service";
import { AlertifyService } from "./../../_services/alertify.service";
import { AuthService } from "./../../_services/auth.service";
import { environment } from "./../../../environments/environment";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Photo } from "src/app/_models/photo";
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.css"]
})
export class PhotoEditorComponent implements OnInit {
  @Input() userPhotos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseURL = environment.apiUrl;
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initializeFileUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeFileUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseURL +
        "users/" +
        this.authService.decodedToken.nameid +
        "/photos",
      authToken: "bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        console.log(response);
        const photo: Photo = JSON.parse(response);
        this.userPhotos.push(photo);
      }
    };
  }
  setMainPhto(photo: Photo) {
    this.userService
      .setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          this.userPhotos.filter(p => p.isMain === true)[0].isMain = false;
          photo.isMain = true;
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            "user",
            JSON.stringify(this.authService.currentUser)
          );
        },
        error => {
          console.log(error);
          this.alertifyService.error(error);
        }
      );
  }
  deletePhoto(photo: Photo) {
    this.alertifyService.confirm("Are you sure you want to delete?", () => {
      this.userService
        .deletePhoto(this.authService.decodedToken.nameid, photo.id)
        .subscribe(
          () => {
            this.userPhotos.splice(
              this.userPhotos.findIndex(p => p.id === photo.id),
              1
            );
            this.alertifyService.success("Photo successfully delete");
          },
          error => this.alertifyService.error(error)
        );
    });
  }
}
