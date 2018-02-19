import { EventEmitter } from "@angular/core";
import { Error } from "./error.model";

export class ErrorService {
  errorOccured = new EventEmitter<Error>();

  handleError (error: any) {
    const errorData = new Error(error.title, error.errorMsg.message);

    //emit event so we can subscribe to it
    this.errorOccured.emit(errorData);
  }
}