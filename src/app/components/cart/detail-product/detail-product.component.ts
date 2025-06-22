import { Component, OnInit } from '@angular/core';
import { ItemCart } from 'src/app/models/item-cart';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent implements OnInit {

  cartItems: ItemCart[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private sessionStorage: SessionStorageService
  ) {}

  ngOnInit(): void {
    // Nos suscribimos para que la lista reaccione a cambios
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartService.totalCart();
  }

  removeItem(id: number): void {
    this.cartService.deleteItemCart(id);
  }

  confirmPurchase(): void {
    const token = this.sessionStorage.getItem('token');
    const userId = token?.id;

    if (!userId) {
      Swal.fire('Error', 'Debes iniciar sesión para confirmar la compra', 'error');
      return;
    }

    const order = {
      userId: userId,
      orderState: 'CONFIRMED',
      items: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.orderService.saveOrder(order).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Compra realizada con éxito', 'success');
        this.cartService.clearCart(); // ✅ Limpiamos el carrito correctamente
      },
      error: () => {
        Swal.fire('Error', 'No se pudo procesar la compra', 'error');
      }
    });
  }
}
