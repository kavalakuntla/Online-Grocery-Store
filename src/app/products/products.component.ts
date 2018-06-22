import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../product.service';
import { ShoppingCart } from './../models/shopping-cart'
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
  	private productService: ProductService,
  	private route:ActivatedRoute,
  	private cartService: ShoppingCartService
  ) {}
  	
  	async ngOnInit() {
  		this.cart$ = await this.cartService.getCart();
  		this.populateProducts();
  	}

  	private populateProducts() {
  		this.productService
  		.getAll()
	  	.switchMap(products => {
	  		this.products = products;
	  		return this.route.queryParamMap;
	  	}).subscribe(params => {
	  		this.category = params.get('category');
	  		this.applyFilter();
	  	});		 
  	}

  	private applyFilter() {	
  		this.filteredProducts = (this.category) ?
  		this.products.filter(p=> p.category === this.category) : 
  		this.products;
  	}	
}
