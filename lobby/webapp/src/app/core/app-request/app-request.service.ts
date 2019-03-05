import { Injectable, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppRequestService {

  private error = new EventEmitter<HttpErrorResponse>();
  private loader = new EventEmitter<number>();

  private loaderCount = 0;

  constructor() { }

  public emitError(error) {
    return this.error.emit(error);
  }

  public getError() {
    return this.error.asObservable();
  }

  public addRequest() {
    this.loaderCount++;
    this.loader.emit(this.loaderCount);
  }

  public removeRequest() {
    this.loaderCount = 0;
    this.loader.emit(this.loaderCount);
  }

  public getLoader() {
    return this.loader.asObservable();
  }

}
