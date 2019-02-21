import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppRequestService } from './app-request/app-request.service';
import { AppStorageService } from './app-storage/app-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private appRequestService: AppRequestService,
    private appStorageService: AppStorageService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.appStorageService.getToken();
    const newReq = req.clone({
      url: req.url,
      headers: req.headers.set(
        'Authorization', token
          ? token.token
          : ''
      )
    });
    this.appRequestService.addRequest();
    return next.handle(newReq).pipe(
      tap(
        evt => {
          this.appRequestService.removeRequest();
        },
        err => {
          this.appRequestService.removeRequest();
          this.handleErrors(err);
        }
      )
    );
  }

  private handleErrors(err) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 403) {
        this.appStorageService.setToken(null);
        this.router.navigate(['dashboard/login']);
      }
      if (err.status >= 400 && err.status < 500) {
        this.appRequestService.emitError(err);
      } else {
        this.router.navigate(['error/500']);
      }
    }
  }
}
