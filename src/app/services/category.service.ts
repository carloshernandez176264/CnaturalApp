import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${environment.apiUrl}/admin/categories`;

  constructor(private http: HttpClient) {}

  // Método para obtener headers con token
  private getAuthHeaders(): HttpHeaders {
    const token = JSON.parse(sessionStorage.getItem('token') || '{}');
    const authToken = token.token || token.accessToken || token; // Ajusta según tu estructura
    
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });
  }

  // Obtener todas las categorías
  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Crear una nueva categoría
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Obtener una categoría por ID
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Actualizar una categoría
  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category, { 
      headers: this.getAuthHeaders() 
    });
  }

  // Eliminar una categoría por ID
  deleteCategoryById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  
}
