import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;
  constructor(
  	private categoryService: CategoryService,
  	private productService: ProductService,
  	private router: Router,
  	private route: ActivatedRoute) {

  	this.categories$ = categoryService.getCategories();

  	this.id = this.route.snapshot.paramMap.get('id');
  	if(this.id)
  		this.productService.getProduct(this.id).take(1).subscribe(p => this.product = p);
  }

  ngOnInit() {
  }

  save(product) {
  	if (this.id) this.productService.updateProduct(this.id, product);
  	else        this.productService.create(product);
  	this.router.navigate(['/admin/products'])
  }

  delete(){
  	if(!confirm('Are you sure you want to delete the product ?')) return;
  	
  	this.productService.delete(this.id);
  	this.router.navigate(['/admin/products']);
  }
}
