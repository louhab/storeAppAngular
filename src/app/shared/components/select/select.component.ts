import { Component,Input,OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() title :string = "";
  @Input() data :any[] = [];
  @Output() selectedValue = new EventEmitter();
  ngOnInit(): void {
      
  }
  constructor(){

  }
  deteChange(event: any){
    this.selectedValue.emit(event);
  }

}
