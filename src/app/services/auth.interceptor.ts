import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private sessionService: SessionStorageService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionService.getToken();

    // Rutas que no deben llevar token
    const publicUrls = [
      '/api/v1/security/login',
      '/api/v1/security/register',
      '/api/v1/home'
    ];

    const isPublic = publicUrls.some(url => request.url.includes(url));

    // Si no es una URL pública y tenemos token, agregarlo con Bearer
    if (!isPublic && token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        
        if (error.status === 401) {
          // Token expirado o inválido
          this.sessionService.clear();
          alert('Sesión expirada');          
            this.router.navigate(['/login']);         
        } else if (error.status === 403) {
          // Sin permisos
          alert('No tienes permisos para acceder a esta sección');
        } else if (error.status === 0) {
          // Sin conexión a internet
          alert('Sin conexión a internet');
        }        
        return throwError(() => error);
      })
    );
  }
}
