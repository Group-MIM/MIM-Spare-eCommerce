import { Component, ElementRef } from '@angular/core';
import { Product } from './models/product';

@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ng';
  public arrayProductos: Array<Product> = [];
 
  constructor(private elementRef: ElementRef){
    if(!localStorage['arrayProductosCarro']){
      localStorage.setItem("arrayProductosCarro", JSON.stringify(this.arrayProductos));
    }
   
  }
  
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }
}
