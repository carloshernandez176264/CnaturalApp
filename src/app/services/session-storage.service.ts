import { Injectable } from '@angular/core';
import { JwtClient } from '../models/jwtclient';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  setItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }

  getRole(): string | null {
    const token = this.getItem('token');
    if (!token?.role) return null;
  
    // Elimina "Optional[...]" si está presente
    const match = token.role.match(/\[(.*?)\]/);
    return match ? match[1] : token.role;
  }
  
  isAdmin(): boolean {
    const role = this.getRole();
    return role === 'ROLE_ADMIN';
  }
  

  isLoggedIn(): boolean {
    return !!this.getItem('token');
  }

  getToken(){
    const token = this.getItem('token');
    return token ? token.token : null;
  }
}
