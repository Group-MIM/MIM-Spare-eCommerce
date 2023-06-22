import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products: Array<Product> = JSON.parse(localStorage.getItem("arrayProductosCarro"));
  public quantityProducts: number = this.products.length > 0 ? this.products.length : 0;
  public product: Product;
  public precioTotal: number = 0.00;
  public precio_envio: number = 0;

  constructor(private router: Router, private productService: ProductService, private orderService: OrderService) { }

  ngOnInit() {
    var precioCarroNavbar = document.getElementById('preciocarro');
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');


    if (this.products == null || this.products === undefined || this.products.length == 0) {
      precioCarroNavbar.innerHTML = '0.00';
      precioCarroNavbarMob.innerHTML = '0.00';

    }

    this.precioTotal = this.sumarPrecioCarro();
    precioCarroNavbar.innerHTML = String(this.precioTotal.toFixed(2));
    precioCarroNavbarMob.innerHTML = String(this.precioTotal.toFixed(2));

    if (this.precioTotal >= 40) {
      this.precio_envio = 0;
    } else if (this.precioTotal < 40) {
      this.precio_envio = 5;
    } 

    if (this.precioTotal <= 0) {
      $(".texto_gastos_envio").addClass("d-none");
    } else {
      $(".texto_gastos_envio").removeClass("d-none");
    }

  }

  isButtonDisabled(quantity: number) {

    if (quantity > 1) {
      return false;
    } else {
      return true;
    }
  }

  quantityReset(i: number) {
    this.product = this.products[i];
    this.product.quantity = 1;
    this.product.priceAmount = this.product.quantity * parseFloat(parseFloat(String(this.product.price)).toFixed(2));;

    if (this.precioTotal >= 40) {
      this.precio_envio = 0;
    } else if (this.precioTotal < 40) {
      this.precio_envio = 5;
    } 

    if (this.precioTotal <= 0) {
      $(".texto_gastos_envio").addClass("d-none");
    } else {
      $(".texto_gastos_envio").removeClass("d-none");
    }

    return this.product.quantity;
  }

  // recalcular(i: number) {
  //   this.product = this.products[i];

  //   this.productService.getProduct(String(this.product.id)).subscribe((data: any) => {

  //     if (data.quantity >= (this.product.quantity)) {
  //       this.product.quantity = this.product.quantity;
  //     } else {
  //       this.product.quantity = data.quantity;
  //     }

  //     this.product.priceAmount = this.product.quantity * parseFloat(parseFloat(String(this.product.price)).toFixed(2));
  //     localStorage.setItem("arrayProductosCarro", JSON.stringify(this.products));

  //     this.sumarPrecioCarro();

  //     this.orderService.addProducts(0, localStorage.getItem('token'), JSON.stringify(this.products))
  //       .subscribe((data: any) => {
  //         return data;
  //       }, (error: any) => {
  //         console.log(error);
  //       });

  //   }, (error: any) => {
  //     console.log(error);
  //   });


  // }

  addQuantity(i: number) {
    this.product = this.products[i];

    this.product.quantity = this.product.quantity + 1;
    this.product.priceAmount = this.product.quantity * parseFloat(parseFloat(String(this.product.price)).toFixed(2));
    localStorage.setItem("arrayProductosCarro", JSON.stringify(this.products));
    this.sumarPrecioCarro();
    this.orderService.addProducts(0, localStorage.getItem('token'), JSON.stringify(this.products)).subscribe((data: any) => {

      if (this.precioTotal >= 40) {
        this.precio_envio = 0;
      } else if (this.precioTotal < 40) {
        this.precio_envio = 5;
      } 

      if (this.precioTotal <= 0) {
        $(".texto_gastos_envio").addClass("d-none");
      } else {
        $(".texto_gastos_envio").removeClass("d-none");
      }

    }, (error: any) => {
      console.log(error);
    });

    return this.product;

  }

  subsQuantity(i: number) {
    this.product = this.products[i];

    this.product.quantity = this.product.quantity - 1;
    this.product.priceAmount = this.product.quantity * parseFloat(parseFloat(String(this.product.price)).toFixed(2));
    localStorage.setItem("arrayProductosCarro", JSON.stringify(this.products));
    this.restarPrecioCarro(this.product);
    this.orderService.addProducts(0, localStorage.getItem('token'), JSON.stringify(this.products)).subscribe((data: any) => {

      if (this.precioTotal >= 40) {
        this.precio_envio = 0;
      } else if (this.precioTotal < 40) {
        this.precio_envio = 5;
      } 

      if (this.precioTotal <= 0) {
        $(".texto_gastos_envio").addClass("d-none");
      } else {
        $(".texto_gastos_envio").removeClass("d-none");
      }

    }, (error: any) => {
      console.log(error);
    });

    return this.product;

  }

  deleteProduct(i: number) {
    this.product = this.products[i];
    this.products.splice(i, 1);
    localStorage.setItem("arrayProductosCarro", JSON.stringify(this.products));
    this.deletePrecioCarro(this.product);
    this.quantityProducts = this.products.length;
    this.orderService.addProducts(0, localStorage.getItem('token'), JSON.stringify(this.products)).subscribe((data: any) => {

      if (this.precioTotal >= 40) {
        this.precio_envio = 0;
      } else if (this.precioTotal < 40) {
        this.precio_envio = 5;
      } 

      if (this.precioTotal <= 0) {
        $(".texto_gastos_envio").addClass("d-none");
      } else {
        $(".texto_gastos_envio").removeClass("d-none");
      }

    }, (error: any) => {
      console.log(error);
    });

  }

  sumarPrecioCarro(): number {
    this.precioTotal = 0.00;
    for (let index = 0; index < this.products.length; index++) {
      const element = this.products[index];

      if (element.priceAmount <= 0.00) {
        element.priceAmount = 0.00;
      }

      this.precioTotal = this.precioTotal + element.priceAmount;
      console.log("precioTotal:" + this.precioTotal);
    }

    var precioCarroNavbar = document.getElementById('preciocarro');
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');

    precioCarroNavbar.innerHTML = String(this.precioTotal.toFixed(2))
    precioCarroNavbarMob.innerHTML = String(this.precioTotal.toFixed(2))

    localStorage.setItem("precioCarro", JSON.stringify(this.precioTotal.toFixed(2)));
    return parseFloat(this.precioTotal.toFixed(2));

  }

  restarPrecioCarro(prod: Product) {

    this.precioTotal = this.sumarPrecioCarro() - prod.price;
    this.sumarPrecioCarro();
    prod.price;
    this.precioTotal;
    var precioCarroNavbar = document.getElementById('preciocarro');
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');

    localStorage.setItem("precioCarro", JSON.stringify(this.precioTotal.toFixed(2)));
    precioCarroNavbar.innerHTML = String(this.precioTotal.toFixed(2));
    precioCarroNavbarMob.innerHTML = String(this.precioTotal.toFixed(2));


  }

  deletePrecioCarro(prod: Product) {
    this.precioTotal = this.sumarPrecioCarro() - prod.priceAmount;
    this.sumarPrecioCarro();
    prod.price;
    this.precioTotal;
    var precioCarroNavbar = document.getElementById('preciocarro');
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');

    localStorage.setItem("precioCarro", JSON.stringify(this.precioTotal.toFixed(2)));
    precioCarroNavbar.innerHTML = String(this.precioTotal.toFixed(2));
    precioCarroNavbarMob.innerHTML = String(this.precioTotal.toFixed(2));

  }

  navigateTo(route: any, id:any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route + id);
    this.router.navigateByUrl(lang + route  + id);
  }
  
}
