import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8085/api/v1/admin/categories';

  constructor(private http: HttpClient) {}

  // Obtener todas las categorías
  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  // Crear una nueva categoría
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  // Obtener una categoría por ID
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  // Eliminar una categoría por ID
  deleteCategoryById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
