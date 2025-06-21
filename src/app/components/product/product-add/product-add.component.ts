import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  id: number = 0;
  code: string = '';
  name: string = '';
  description: string = '';
  price: number | null = null;
  urlImage: string = '';
  userId: string = '1';  // ⚠️ Idealmente deberías traerlo del usuario logueado
  categoryId: string = '';
  selectFile!: File;
  fileName: string = '';
  categories: Category[] = [];
  isEditMode = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.getProductById(id);
      }
    });
  }

  getCategories():void {
    this.categoryService.getCategoryList().subscribe({
      next: data => this.categories = data
    });
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(product => {
      this.id = product.id;
      this.code = product.code;
      this.name = product.name;
      this.description = product.description;
      this.price = product.price;
      this.urlImage = product.urlImage;
      this.userId = product.userId;
      this.categoryId = product.categoryId;
    });
  }

  onFileSelected(event: any) {
    this.selectFile = event.target.files[0];
    if (this.selectFile) {
      this.fileName = this.selectFile.name;
    }
  }

  addProduct() {
    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('code', this.code);
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price?.toString() || '');
    if (this.selectFile) {
      formData.append('image', this.selectFile);
    }
    formData.append('urlImage', this.urlImage);
    formData.append('userId', this.userId);
    formData.append('categoryId', this.categoryId);

    this.productService.createProduct(formData).subscribe({
      next: () => {
        const msg = this.isEditMode ? 'Producto actualizado correctamente' : 'Producto creado correctamente';
        Swal.fire('Éxito', msg, 'success');
        this.router.navigate(['/product-list']);
      },
      error: () => {
        Swal.fire('Error', 'Ocurrió un error al guardar el producto', 'error');
      }
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/product-add', id]);
  }
}
