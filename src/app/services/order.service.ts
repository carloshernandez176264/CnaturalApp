import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { OrderRequest } from '../models/order-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  saveOrder(order: OrderRequest): Observable<any> {
    const tokenString = sessionStorage.getItem('token');
    let headers = new HttpHeaders();

    if (tokenString) {
      const tokenObj = JSON.parse(tokenString);
      const jwt = tokenObj.token; // asegúrate que el token esté aquí
      headers = headers.set('Authorization', `Bearer ${jwt}`);
    }

    return this.http.post(this.apiUrl, order, { headers });
  }

  // src/app/services/order.service.ts
  getOrdersByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}
