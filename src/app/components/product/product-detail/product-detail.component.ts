import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCart } from 'src/app/models/item-cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  product!: Product;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe({
      next: data => this.product = data,
      error: err => console.error(err)
    });
  }

  addToCart(): void {
    const item = new ItemCart(
      this.product.id,
      this.product.name,
      this.quantity,
      this.product.price
    );
  
    this.cartService.addItemCart(item);
  
    Swal.fire('Añadido', 'Producto añadido al carrito', 'success');
  }
  
}
