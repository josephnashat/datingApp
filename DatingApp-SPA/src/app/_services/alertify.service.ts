import { Injectable } from "@angular/core";
import * as alertify from "alertifyjs";
@Injectable({
  providedIn: "root"
})
export class AlertifyService {
  constructor() {}

  success(message: string) {
    alertify.success(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
  error(message: string) {
    alertify.error(message);
  }
  message(message: string) {
    alertify.message(message);
  }

  confirm(
    message: string,
    okCallback: () => any,
    title = "Confirm",
    cancelCallBack = () => {}
  ) {
    alertify.confirm(title, message, okCallback, cancelCallBack);
    // alertify.confirm(message, (e: any) => {
    //   if (e) {
    //     okCallback();
    //   } else {
    //     console.log(e);
    //   }
    // });
  }
}
