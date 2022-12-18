import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import {Porduct} from  './../../modules/product';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() data!:Porduct ;
  @Output() item = new EventEmitter();
  addButton : boolean = false ;
  amount : number = 0
  constructor(){}
  ngOnInit(): void {}
  add(){
    this.item.emit({item : this.data , quantity : this.amount});
    this.addButton = false;
  }
}
