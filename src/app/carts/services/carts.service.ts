import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environement } from 'src/environement/environement';
@Injectable({
  providedIn: 'root'
})
export class CartsService {
  apiUrl = environement.basApi
  constructor(private http:HttpClient) { }
  sendCart(products:any){
    return this.http.post(this.apiUrl +'/carts',products )
  }
  getAllCarts(param?:any){
    let params = new HttpParams();
    params = params.append("startDate", param?.start).append("endDate", param?.end)
    return this.http.get(this.apiUrl +'/carts', {params:params})
  }
  deleteCart(id:number){
    return this.http.delete(this.apiUrl +'/carts/'+id)
  }
}
