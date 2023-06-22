import { Component, Input, OnInit } from '@angular/core';
import { AppGlobals } from '../app.global';
import { Product } from '../models/product';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [AppGlobals]
})
export class GalleryComponent implements OnInit {
  @Input() product: Product;
  public quantity: any = 0;
  public hover: boolean = false;
  public quantityOld: any = 0;
  public productsCart: any[] = [];
  public carrologo: any;
  public preciocarro: any;
  public preciocarro_mob: any;

  public precioSeleccionado: any;
  public resultado: any;
  public precioAux: number;
  public arrayAux1: any;
  public arrayAux2: any;
  public productoCarro: Product;
  public precioTotal: number = 0.00;
  public products: Array<Product> = JSON.parse(localStorage.getItem("arrayProductosCarro"));
  public arrayProductos: Array<Product> = [];
  public arrayProductosCart: Array<Product> = [];
  public isLogin: boolean = false;


  constructor(private router: Router, private productService: ProductService, private _global: AppGlobals, private orderService: OrderService) { }

  navigateTo(route: any, id:any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route + id);
    this.router.navigateByUrl(lang + route + id );
  }

  ngOnInit() {
    if (window.screen.width <= 991) {
      $(".contenedor_ficha").addClass('m-1');

    }else{
      $(".contenedor_ficha").removeClass('m-1');

    }
    
    if (localStorage.getItem('token')) {
      this.isLogin = true;
      
    }

    this.products = JSON.parse(localStorage.getItem("arrayProductosCarro"));

    var precioCarroNavbar = document.getElementById('preciocarro');
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');

    if(precioCarroNavbar){
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

  toastNoLogin(){
    var x = document.getElementById("toast-user");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }


  quantityReset() {
    this.quantity = 0;
    return this.quantity;
  }


  addQuantity() {
    this.quantity = this.quantity + 1;

    return this.product;

  }

  addProducts(quantity: number) {

    if (quantity > 0) {

      this.precioAux = this.product.price;

      this.product.price = (this.product.price * quantity);
      this.product.price = +parseFloat(String(this.product.price));

      this.preciocarro = document.getElementById('preciocarro').innerHTML;
      this.preciocarro_mob = document.getElementById('preciocarro-mob').innerHTML;


      this.arrayAux1 = JSON.parse(localStorage.getItem("arrayProductos"));
      this.arrayAux2 = JSON.parse(localStorage.getItem("arrayProductosCarro"));

      if (typeof this.arrayAux1 !== 'undefined'
        && this.arrayAux1 !== null
        && typeof this.arrayAux2 !== 'undefined'
        && this.arrayAux2 !== null) {

        this._global.arrayProductos = JSON.parse(localStorage.getItem("arrayProductos"));
        this._global.arrayProductosCart = JSON.parse(localStorage.getItem("arrayProductosCarro"));
      }

      this.createProductsCart(this._global.arrayProductos, this._global.arrayProductosCart);

      this._global.arrayProductos.push(this.product);

      localStorage.setItem("arrayProductos", JSON.stringify(this._global.arrayProductos));

      this.productoCarro = new Product();
      this.productoCarro.id = this.product.id;
      this.productoCarro.price = this.precioAux + this.product.price;
      this.productoCarro.price = parseFloat(parseFloat(String(this.productoCarro.price)).toFixed(2));
      this.productoCarro.quantity = this.quantityOld + this.quantity;
      this.productoCarro.imageLink = this.product.imageLink;
      this.productoCarro.title = this.product.title;
      this.productoCarro.priceAmount = this.productoCarro.price * this.productoCarro.quantity;
      this.productoCarro.iva = this.product.iva;
      this.productoCarro.price_sin_iva = this.product.price_sin_iva;

      this._global.arrayProductosCart.push(this.productoCarro);

      localStorage.setItem("arrayProductosCarro", JSON.stringify(this._global.arrayProductosCart));

      this.product.price = this.precioAux;

      // console.log(JSON.parse(localStorage.getItem("arrayProductosCarro")));

      this.sumarPrecioCarro(JSON.parse(localStorage.getItem("arrayProductosCarro")));

      var x = document.getElementById("toast");
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);

      this.orderService.addProducts(0, localStorage.getItem('token'), JSON.stringify(this._global.arrayProductosCart))
      .subscribe((data: any) => {
        console.log(data);
      }, (error: any) => {
        console.log(error);
      });

    }

  }

  createProductsCart(arrayProductos: Product[], arrayProductosCarro: Product[]) {

    for (let index = 0; index < arrayProductos.length; index++) {
      const element = arrayProductos[index];

      if (this.product.id == element.id) {
        arrayProductos.splice(index, 1);

      }

    }

    for (let index = 0; index < arrayProductosCarro.length; index++) {
      const element = arrayProductosCarro[index];

      if (this.product.id == element.id) {
        this.quantityOld = element.quantity;
        arrayProductosCarro.splice(index, 1);

      }

    }

  }

  sumarPrecioCarro(prods: Array<Product> = []): number {
    this.precioTotal = 0.00;
    for (let index = 0; index < prods.length; index++) {
      const element = prods[index];

      if (element.priceAmount <= 0.00) {
        element.priceAmount = 0.00;
      }

      this.precioTotal = this.precioTotal + element.priceAmount;
    }

    var precioCarroNavbar = document.getElementById('preciocarro');
    precioCarroNavbar.innerHTML = String(this.precioTotal.toFixed(2))
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');
    precioCarroNavbarMob.innerHTML = String(this.precioTotal.toFixed(2))
    localStorage.setItem("precioCarro", JSON.stringify(this.precioTotal.toFixed(2)));
    return parseFloat(this.precioTotal.toFixed(2));


  }

  onResize(event){
    if (window.screen.width <= 991 || event.target.innerWidth <= 991) {
      $(".contenedor_ficha").addClass('m-1');

    }else{
      $(".contenedor_ficha").removeClass('m-1');

    }
  }

  getPrecioCarro(): number {
    this.precioTotal = 0.00;
    for (let index = 0; index < this.products.length; index++) {
      const element = this.products[index];

      if (element.priceAmount <= 0.00) {
        element.priceAmount = 0.00;
      }

      this.precioTotal = this.precioTotal + element.priceAmount;
    }

    var precioCarroNavbar = document.getElementById('preciocarro');
    precioCarroNavbar.innerHTML = String(this.precioTotal.toFixed(2))
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');
    precioCarroNavbarMob.innerHTML = String(this.precioTotal.toFixed(2))
    localStorage.setItem("precioCarro", JSON.stringify(this.precioTotal.toFixed(2)));
    return parseFloat(this.precioTotal.toFixed(2));

  }

}
