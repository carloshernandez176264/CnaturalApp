import { Injectable } from '@angular/core';
import { ItemCart } from '../models/item-cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

 private itemsMap: Map<number, ItemCart> = new Map<number, ItemCart>();
  private cartItemsSubject = new BehaviorSubject<ItemCart[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addItemCart(item: ItemCart): void {
    this.itemsMap.set(item.productId, item);
    this.updateCartItems();
  }

  deleteItemCart(id: number): void {
    this.itemsMap.delete(id);
    this.updateCartItems(); // 🔥 AQUÍ estaba el problema: no actualizabas el observable
  }

  totalCart(): number {
    let total = 0;
    this.itemsMap.forEach(item => {
      total += item.getTotalPriceItem();
    });
    return total;
  }

  clearCart(): void {
    this.itemsMap.clear();
    this.updateCartItems();
  }

  private updateCartItems(): void {
    const itemsArray = Array.from(this.itemsMap.values());
    this.cartItemsSubject.next(itemsArray); // 🔁 actualiza todos los componentes suscritos
  }

  getItems(): ItemCart[] {
  return Array.from(this.itemsMap.values());
}


}
