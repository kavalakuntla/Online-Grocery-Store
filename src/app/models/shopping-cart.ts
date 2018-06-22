import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
	items: ShoppingCartItem[] = [];
	constructor(private itemsMap: {[productId: string]: ShoppingCartItem}) {
		this.itemsMap = itemsMap || {};
		for(let productId in itemsMap) {
			let item = itemsMap[productId];
			let x = new ShoppingCartItem({
				//title: item.title,
				//imageUrl: item.imageUrl,
				//price: item.price,
				...item,
				$key: productId
			});
			this.items.push(x);
		}
	} 

	get totalItemsCount() {
		let count = 0;
  		for (let productId in this.itemsMap) 
  			count += this.itemsMap[productId].quantity;
  	    return count;
	}

	get totalPrice() {
		let sum = 0;
		for (let productId in this.items) 
			sum += this.items[productId].totalPrice;
		return sum;
	}

	getQuantity(product: Product) {
	  	let item = this.itemsMap[product.$key];
	  	return item ? item.quantity : 0;
  }
}