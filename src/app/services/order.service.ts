import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { OrderRequest } from '../models/order-request';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/v1/orders';

  constructor(private http: HttpClient) {}

  saveOrder(order: OrderRequest): Observable<any> {
  return this.http.post(`${this.apiUrl}/orders`, order);
}
}
