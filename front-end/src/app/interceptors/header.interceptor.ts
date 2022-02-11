import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../shared/services';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      url: `http://34.246.202.189:5000${req.url}`,
      setHeaders: this.authService.getAuthorizationHeaders(),
    });

    return next.handle(req);
  }
}
