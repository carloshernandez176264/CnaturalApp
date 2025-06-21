import { Injectable } from '@angular/core';
import { ItemCart } from '../models/item-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Map<number,ItemCart> = new Map<number,ItemCart>();

  itemList: ItemCart[] = [];

  constructor() { }

  addItemCart(item: ItemCart){
    this.items.set(item.productId, item);
    this.itemList = Array.from(this.items.values());
  }

  deleteItemCart(id: number){
    this.items.delete(id);
    this.items.forEach(
      (valor, clave) => {console.log('esta es la clave ' + clave + ' y el valor es ' + valor)}
    )
  }

  totalCart(){
    let totalCart: number = 0;
    this.items.forEach(
      (item, clave) => {
        totalCart += item.getTotalPriceItem()
      }
    );
    return totalCart;
  }

  convertToListFromMap(){
    this.itemList.splice(0, this.itemList.length);
    this.items.forEach(
      (item, clave) => {
        this.itemList.push(item)
      }
    );
    return this.itemList;
  }
}
