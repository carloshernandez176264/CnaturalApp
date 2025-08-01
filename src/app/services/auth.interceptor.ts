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
import Swal from 'sweetalert2';

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
          Swal.fire({
            title: 'Sesión expirada',
            text: 'Tu sesión ha expirado. Serás redirigido al login.',
            icon: 'warning',
            timer: 3000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/login']);
          });
        } else if (error.status === 403) {
          // Sin permisos
          Swal.fire({
            title: 'Acceso denegado',
            text: 'No tienes permisos para realizar esta acción.',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        } else if (error.status === 0) {
          // Error de conexión
          Swal.fire({
            title: 'Error de conexión',
            text: 'No se puede conectar con el servidor. Verifica tu conexión.',
            icon: 'error',
            confirmButtonText: 'Reintentar'
          });
        }
        
        return throwError(() => error);
      })
    );
  }
}
