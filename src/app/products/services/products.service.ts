import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environement } from 'src/environement/environement';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl = environement.basApi
  item : any ;
  constructor(private http:HttpClient) { }
  getAllPorducts() {
    return this.http.get(this.apiUrl +'/products')
  }
  getAllGategories(){
    return this.http.get(this.apiUrl +'/products/categories')
  }
  getProductByCategory(categorie:string){
    return this.http.get(this.apiUrl +'/products/category/'+ categorie)
  }
  getProduct(id:number){
    return this.http.get(this.apiUrl +'/products/'+ id)
  }
  
}
