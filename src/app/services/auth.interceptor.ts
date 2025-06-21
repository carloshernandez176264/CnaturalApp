import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private session: SessionStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.session.getToken();

    // Rutas que no deben llevar token
    const publicUrls = [
      '/api/v1/security/login',
      '/api/v1/security/register',
      '/api/v1/home'
    ];

    const isPublic = publicUrls.some(url => request.url.includes(url));

    if (!isPublic && token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
