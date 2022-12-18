import { Component ,OnInit } from '@angular/core';
import {ProductsService} from './../../services/products.service';
import {Porduct} from  './../../modules/product';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products : Porduct[] = [];
  categories : any[] = [];
  loading :boolean = false ;
  cartProduct : any[] = [];
  constructor(private productsService :ProductsService ){}
  ngOnInit(): void {
   this.getAllPorducts()
   this.getAllGategories()
  }
  getAllPorducts(){
    this.loading = true;
    this.productsService.getAllPorducts().subscribe((response :any)=>{
      this.products = response ;
      this.loading = false ;
    },
    error =>{
      // 400 incorrect data body
      // 401 UNATHORIZED 
      // 403 cors origin 
      // 404 inccorect path or url 
      // 409 duplicated parameters
      // 500 internal server error
      console.log(error)
      this.loading = false ;
    }
    )
  }
  getAllGategories(){
    this.productsService.getAllGategories().subscribe((response :any)=>{
      this.categories = response
    },
    error=>{
      console.log(error)
      this.loading = false ;
    }
    )
  }
  filterCategory(event:any){
   let value = event.target.value ; 
   (value=== 'all') ? this.getAllPorducts() :  this.getProductByCategory(value) 
  }
  getProductByCategory(keyword: string){
    this.loading = true;
    this.productsService.getProductByCategory(keyword).subscribe((product:any)=>{
      this.products = product
      this.loading = false ;
     })
  }
  reciveCategory(event:any){
    console.log(event)
  }
  addToCart(event:any){
    // this.cartProduct = localStorage.getItem('cart')
    // JSON.stringify(event) permet de traiter les données tel qu'elle est 
    // Json.parse  permet d'avoir les données tel qu'elle est stocker 
    if("cart" in localStorage ){
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProduct.find(item=> item.item.id === event.item.id)
      if(exist){
        alert('Product aleady exist')
      }
      else {
        this.cartProduct.push(event)
        localStorage.setItem('cart', JSON.stringify(this.cartProduct))
      }
    }
  }
}
