import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = ['name', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(): void {
    this.categoryService.getCategoryList().subscribe({
      next: data => this.categories = data,
      error: err => console.error('Error al cargar categorías', err)
    });
  }

  deleteCategoryById(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategoryById(id).subscribe({
          next: () => {
            Swal.fire('Eliminada', 'La categoría fue eliminada', 'success');
            this.listCategories();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la categoría', 'error');
          }
        });
      }
    });
  }

  goToEdit(id: number): void {
    this.router.navigate(['/category-add', id]);
  }

  goToAdd(): void {
    this.router.navigate(['/category-add']);
  }
}

