import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProductsService} from './../../services/products.service'
import {Porduct} from  './../../modules/product';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  ProductId :any ;
  product !:Porduct ;
  loading:boolean = false ;
  constructor(private route: ActivatedRoute, private productsService: ProductsService){
    this.ProductId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit() :void {
    this.getProduct();
  }
  getProduct(){
   this.loading = true ;
   this.productsService.getProduct(this.ProductId).subscribe((res:any)=>{
    this.product = res
    this.loading = false;
   })
  }
}
