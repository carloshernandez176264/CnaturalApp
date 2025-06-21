import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {

  id: number = 0;
  name: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategoryById();
  }

  addCategory(): void {
    const category = new Category(this.id, this.name);
    this.categoryService.createCategory(category).subscribe({
      next: () => {
        Swal.fire('Success', 'Categoría guardada correctamente', 'success');
        this.router.navigate(['/category-list']);
      },
      error: () => {
        Swal.fire('Error', 'No se pudo guardar la categoría', 'error');
      }
    });
  }

  getCategoryById(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.categoryService.getCategoryById(id).subscribe(category => {
          this.id = category.id;
          this.name = category.name;
        });
      }
    });
  }

}
