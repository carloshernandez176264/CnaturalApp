import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  isAdmin = false;
  dataSource = new MatTableDataSource<Category>([]); // Inicializar con array vacío
  displayedColumns: string[] = ['name', 'actions'];
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryService: CategoryService,
    private sessionService: SessionStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthAndLoadCategories();
  }

  ngAfterViewInit(): void {
    // Configurar paginación y ordenamiento después de la vista
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  private checkAuthAndLoadCategories(): void {
    // Debug: verificar token
    
    
    // Verificar si hay sesión válida
    if (!this.sessionService.isLoggedIn()) {
      this.redirectToLogin('No hay sesión activa');
      return;
    }

    // Verificar rol de administrador
    this.isAdmin = this.sessionService.isAdmin();
    
    if (!this.isAdmin) {
      Swal.fire({
        title: 'Acceso denegado',
        text: 'No tienes permisos para acceder a esta sección',
        icon: 'error',
        confirmButtonText: 'Volver'
      }).then(() => {
        this.router.navigate(['/']);
      });
      return;
    }

    this.listCategories();
  }

  private redirectToLogin(message: string): void {
    Swal.fire({
      title: 'Sesión requerida',
      text: message,
      icon: 'warning',
      confirmButtonText: 'Ir al login'
    }).then(() => {
      this.sessionService.clear();
      this.router.navigate(['/login']);
    });
  }

  listCategories(): void {
    this.isLoading = true;
    this.categoryService.getCategoryList().subscribe({
      next: (categories) => {
        console.log('Categorías recibidas:', categories);
        this.dataSource.data = categories;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.isLoading = false;
        
        if (err.status === 401) {
          Swal.fire({
            title: 'Sesión expirada',
            text: 'Tu sesión ha expirado. Inicia sesión nuevamente.',
            icon: 'warning',
            confirmButtonText: 'Ir al login'
          }).then(() => {
            this.sessionService.clear();
            this.router.navigate(['/login']);
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudieron cargar las categorías. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Reintentar'
          }).then(() => {
            this.listCategories();
          });
        }
      }
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
            Swal.fire('Eliminada', 'La categoría fue eliminada exitosamente', 'success');
            this.listCategories();
          },
          error: (err) => {
            console.error('Error al eliminar categoría:', err);
            if (err.status === 401) {
              Swal.fire('Sesión expirada', 'Inicia sesión nuevamente', 'warning');
              this.router.navigate(['/login']);
            } else {
              Swal.fire('Error', 'No se pudo eliminar la categoría', 'error');
            }
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

