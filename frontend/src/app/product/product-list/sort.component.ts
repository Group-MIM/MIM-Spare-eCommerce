import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'ng-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  @Input() productsSort: Observable<Object>;
  @Output() ordenacion: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
//console.log(this.productsSort);
  }

  sort(ordenarPor: string): void{
      this.ordenacion.emit(ordenarPor);
    
  }

}
