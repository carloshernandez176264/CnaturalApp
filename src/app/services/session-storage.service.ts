import { Injectable } from '@angular/core';
import { JwtClient } from '../models/jwtclient';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private isAdminSubject = new BehaviorSubject<boolean>(this.getRole() === 'ROLE_ADMIN');




  setItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
    this.refreshStatus();
  }

  clear() {
    sessionStorage.clear();
    this.refreshStatus();
  }

  refreshStatus() {
    this.isLoggedInSubject.next(this.isLoggedIn());
    this.isAdminSubject.next(this.getRole() === 'ROLE_ADMIN');
  }

  getItem(key: string) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }
 

  /*getRole(): string | null {
    const token = this.getItem('token');
    if (!token?.role) return null;
  
    // Elimina "Optional[...]" si está presente
    const match = token.role.match(/\[(.*?)\]/);
    return match ? match[1] : token.role;
  }*/

  getRole(): string {
    const token = this.getItem('token');
    return token?.role;
  }

  isAdmin(): boolean {
    const role = this.getRole();
    return role === 'ROLE_ADMIN';
  }

  isLoggedIn(): boolean {
    return !!this.getItem('token');
  }

  getToken() {
     const tokenObj = JSON.parse(sessionStorage.getItem('token') || '{}');
     return tokenObj?.token || '';
  }

  get isLoggedIn$() {
    return this.isLoggedInSubject.asObservable();
  }

  get isAdmin$() {
    return this.isAdminSubject.asObservable();
  }
}
