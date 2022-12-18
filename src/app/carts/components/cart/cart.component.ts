import { Component,OnInit } from '@angular/core';
import { CartsService } from './../../services/carts.service'
import {FormGroup ,FormBuilder} from '@angular/forms'; 
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit  {
  cartProduct:any[]= [];
  totale : number = 0 ;
  success : boolean = false ;
  carts : any[] = [];
  form !: FormGroup;
  constructor(private  cartsService:CartsService ,private formBuilder:FormBuilder){}
  ngOnInit(): void {
      this.getCartProducts();
      this.getAllCarts();
      this.form = this.formBuilder.group({
        start : [''],
        end : [''],
      });

  }
  getCartProducts(){
    if("cart" in localStorage){
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotale()
  }
  getCartTotale(){
    this.totale = 0 ;
    for(let x in this.cartProduct){
      this.totale += Math.round(this.cartProduct[x].item.price * this.cartProduct[x].quantity)
    }    
  }
  detectChange(){
    this.getCartTotale()
    localStorage.setItem('cart', JSON.stringify(this.cartProduct))
  }
  minAmount(index:number){
    this.cartProduct[index].quantity --;
    this.getCartTotale()
    localStorage.setItem('cart', JSON.stringify(this.cartProduct))
  }
  addAmount(index:number){
    this.cartProduct[index].quantity ++;
    this.getCartTotale()
    localStorage.setItem('cart', JSON.stringify(this.cartProduct))
  }
  deleteProduct(index: number) {
   this.cartProduct.splice(index, 1) 
   localStorage.setItem('cart', JSON.stringify(this.cartProduct))
  }
  clearData(){
    this.cartProduct= [];
    localStorage.setItem('cart', JSON.stringify(this.cartProduct))
    this.getCartTotale()
  }
  addCart(){
   let products = this.cartProduct.map(item=>{
    return {productId: item.item.id,quantity: item.quantity}
   }) 
    let Model = {
      userId : 5,
      date : new Date(),
      products : products
    }
    this.cartsService.sendCart(Model).subscribe((response:any)=>{
      console.log(response)
      this.clearData()
      this.success = true 
      
    })
  }
  getAllCarts(){
    this.cartsService.getAllCarts().subscribe((response:any)=>
    {
      this.carts = response
    }
    )
  }
  applyFilter(){
    let date = this.form.value
    this.cartsService.getAllCarts(date).subscribe((response:any)=>
    {
      this.carts = response
    }
    )
  }
  deleteCart(id:number){
    this.cartsService.deleteCart(id).subscribe((response:any)=>{
    this.getAllCarts()
    })
  }
}
