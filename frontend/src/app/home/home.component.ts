import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'ng-ecommerce-front',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public products: Array<Product> = JSON.parse(localStorage.getItem("arrayProductosCarro"));
  public product: Product;
  public precioTotal: number = 0.00;
  public usuario: Observable<any>;
  

  constructor(private orderService: OrderService) { }

  ngOnInit() {
//    document.cookie="PHPSESSID=ervlj7d750a8m1n; path=/";
    if (localStorage.getItem("token") != null) {
      this.usuario = this.orderService.getProducts(0, localStorage.getItem("token"));

      this.usuario.forEach(function (element) {
        //  console.log(JSON.stringify(element[0]));
        if (typeof element[0] !== 'undefined' && element[0].length > 0) {
          localStorage.setItem("arrayProductosCarro", JSON.stringify(JSON.parse(element[0][0]['cart'])));

        } else {
          localStorage.setItem("arrayProductosCarro", '[]');

        }
      });
    }

    this.products = JSON.parse(localStorage.getItem("arrayProductosCarro"));

    var precioCarroNavbar = document.getElementById('preciocarro');
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');


    if (precioCarroNavbar || precioCarroNavbarMob) {
      if (this.products == null || this.products === undefined || this.products.length == 0) {
        precioCarroNavbar.innerHTML = '0.00';
        precioCarroNavbarMob.innerHTML = '0.00';

      }

      var precioCarroNavbar = document.getElementById('preciocarro');
      var precioCarroNavbarMob = document.getElementById('preciocarro-mob');


      this.precioTotal = JSON.parse(localStorage.getItem("precioCarro"));
      precioCarroNavbar.innerHTML = String(Math.round((this.precioTotal) * 100) / 100);
      precioCarroNavbarMob.innerHTML = String(Math.round((this.precioTotal) * 100) / 100);

      this.getPrecioCarro();
    }

  }


  getPrecioCarro(): number {
    this.precioTotal = 0.00;

    if (this.products != null) {
      for (let index = 0; index < this.products.length; index++) {
        const element = this.products[index];

        if (element.priceAmount <= 0.00) {
          element.priceAmount = 0.00;
        }

        this.precioTotal = this.precioTotal + element.priceAmount;
      }
    }


    var precioCarroNavbar = document.getElementById('preciocarro');
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');

    precioCarroNavbar.innerHTML = String(this.precioTotal.toFixed(2))
    precioCarroNavbarMob.innerHTML = String(this.precioTotal.toFixed(2))

    localStorage.setItem("precioCarro", JSON.stringify(this.precioTotal.toFixed(2)));
    return parseFloat(this.precioTotal.toFixed(2));

  }
}
