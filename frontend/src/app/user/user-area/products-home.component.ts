import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'ng-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})

export class ProductsHomeComponent implements OnInit {
  products: Observable<any>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  save1() {
    console.log($("#prod1select").val());
    var producto_id = $("#prod1select").val();
    this.productService.saveProductHome(1, producto_id).subscribe((data: any) => {
      console.log(data);
      alert("Producte 1 actualitzat correctament.");

    }, (error: any) => {
      console.log(error);
      alert("Problemes al actualitzar producte 1");

    });
  }

  save2() {
    console.log($("#prod2select").val());
    var producto_id = $("#prod2select").val();
    this.productService.saveProductHome(2, producto_id).subscribe((data: any) => {
      console.log(data);
      alert("Producte 2 actualitzat correctament.");

    }, (error: any) => {
      console.log(error);
      alert("Problemes al actualitzar producte 2");

    });
  }

  save3() {
    console.log($("#prod3select").val());
    var producto_id = $("#prod3select").val();
    this.productService.saveProductHome(3, producto_id).subscribe((data: any) => {
      console.log(data);
      alert("Producte 3 actualitzat correctament.");

    }, (error: any) => {
      console.log(error);
      alert("Problemes al actualitzar producte 3");

    });
  }

}
