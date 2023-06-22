import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'ng-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css']
})
export class StockManagementComponent implements OnInit {
  products: Observable<any>;
  pageActual: number = 1;


  constructor(private productService: ProductService) { }

  ngOnInit() {

    this.products = this.productService.getProducts();

    console.log(this.products);
  }

  updateStock(id: any) {
    var quantity = $("#" + id + "_quantity").val();
    this.productService.updateStock(id, quantity).subscribe((data: any) => {
      console.log(data);
      alert("Stock actualitzat correctament.");

    }, (error: any) => {
      console.log(error);
      alert("Problemes al actualitzar Stock");

    });
  }

}
