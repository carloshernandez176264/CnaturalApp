import { Component, OnInit } from '@angular/core';
import { ItemCart } from 'src/app/models/item-cart';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';
import { GuestCheckoutModalComponent } from 'src/app/guest-checkout-modal/guest-checkout-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderRequest } from 'src/app/models/order-request';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent implements OnInit {
  
  cartItems: ItemCart[] = [];

  id: number = 0;
  name: string = '';
  description:string= '';
  price!: number;
  urlImage: string = '';
  quantity: number = 0;

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private orderService: OrderService,
    private sessionStorage: SessionStorageService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Nos suscribimos para que la lista reaccione a cambios
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  addCart(id:NumberFormatStyle){
    let item = new ItemCart(id, this.name,this.quantity, this.price);

    this.cartService.addItemCart(item);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Producto añadido Correctamente al carrito",
      showConfirmButton: false,
      timer: 1800
    });
    this.router.navigate(['/cart']);    
  }

  getTotal(): number {
    return this.cartService.totalCart();
  }

  removeItem(id: number): void {
    this.cartService.deleteItemCart(id);
  }

  
  openGuestModal(): void {
  const dialogRef = this.dialog.open(GuestCheckoutModalComponent, {
    width: '400px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // Por ahora, los datos no se mandan, pero podrían enviarse al backend o almacenarse
      this.proceedToPayment(result); // Aunque buyer no existe en OrderRequest, puedes enviarlo opcionalmente al backend si lo amplías
    }
  });
}


  confirmPurchase(): void {
  const token = this.sessionStorage.getItem('token');
  const items = this.cartService.getItems();

  if (!token) {
    // 👉 Usuario no autenticado: mostrar modal para ingresar datos de comprador
    this.openGuestModal(); // esta función la implementamos enseguida
    return;
  }

  const order: OrderRequest = {
    userId: token.id,
    orderState: 'CONFIRMED',
    items: items.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }))
  };

  this.orderService.saveOrder(order).subscribe({
    next: () => {
      Swal.fire('Éxito', 'Compra realizada con éxito', 'success');
      this.cartService.clearCart();
    },
    error: () => {
      Swal.fire('Error', 'No se pudo procesar la compra', 'error');
    }
  });
}

  proceedToPayment(data?: { name: string; email: string; address: string; phone: string }): void {
  const items = this.cartService.getItems();

  const tokenString = this.sessionStorage.getItem('token');
  let userId = 0;

  if (tokenString) {
    const token = JSON.parse(tokenString); // ✅ Parseo correcto del objeto
    userId = token?.id || 0;
  }

  const order: OrderRequest = {
    userId: userId,
    orderState: 'PENDING',
    items: items.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    })),
    buyerData: data // opcional
  };

  this.orderService.saveOrder(order).subscribe({
    next: (response) => {
      Swal.fire('Éxito', 'Redirigiendo a Mercado Pago...', 'success');
      window.location.href = response.init_point;
    },
    error: () => {
      Swal.fire('Error', 'No se pudo procesar la compra', 'error');
    }
  });
}


isUserLoggedIn(): boolean {
  const token = this.sessionStorage.getItem('token');
  return !!token;
}

getProductById(){
    this.activatedRoute.params.subscribe(
      product => {
        let id = product['id'];
        this.productService.getProductById(id).subscribe(
          res => {            
            this.name = res.name;
            this.description = res.description;
            this.price = res.price;
            this.urlImage = res.urlImage;
          }
        );
      }
    )    
  }


  
}
