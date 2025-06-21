import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private publicUrl = 'http://localhost:8085/api/v1/home';
  private apiUrl: string= "http://localhost:8085/api/v1/admin/products"
  
  constructor(
    private http: HttpClient
  ) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.publicUrl);
  }

  createProduct(formData: FormData):Observable<Product>{
    return this.http.post<Product> (this.apiUrl, formData)
  }

  getProductById(id: number):Observable<Product>{
    return this.http.get<Product> (`${this.publicUrl}/${id}`);
  }

  deleteProductById(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  updateProduct(id: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, formData);
  }
  
  
}
