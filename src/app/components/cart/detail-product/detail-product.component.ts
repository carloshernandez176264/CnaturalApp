import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  cartItems = [
    { id: 1, name: 'Crema Nutritiva', price: 45000, quantity: 2 },
    { id: 2, name: 'Loción Refrescante', price: 32000, quantity: 1 },
  ];

  ngOnInit(): void {}

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeItem(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  confirmPurchase(): void {
    console.log('Procesando compra...');
    // Aquí puedes redirigir o llamar al backend
  }
}
