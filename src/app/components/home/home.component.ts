import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  slides = [
    { title: '🌿 Productos Naturales', description: 'Ingredientes 100% orgánicos para tu bienestar.' },
    { title: '🔥 Promociones Semanales', description: 'Encuentra ofertas exclusivas cada semana.' },
    { title: '❤️ Confianza y calidad', description: 'Clientes felices con resultados reales.' }
  ];
  
  activeSlideIndex = 0;
  activeSlide = this.slides[0];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.autoSlide();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res) => this.products = res,
      error: () => console.error('Error al cargar productos')
    });
  }

  autoSlide(): void {
    setInterval(() => {
      this.activeSlideIndex = (this.activeSlideIndex + 1) % this.slides.length;
      this.activeSlide = this.slides[this.activeSlideIndex];
    }, 5000);
  }
}
