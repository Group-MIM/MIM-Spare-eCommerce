import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { AppGlobals } from '../../app.global';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'ng-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [AppGlobals]
})
export class ProductDetailComponent implements OnInit {
  public id: any;
  public params: any;
  public products: Array<Product> = JSON.parse(localStorage.getItem("arrayProductosCarro"));
  public quantity: number = 0;
  public product: Product = new Product();
  public precioTotal: number = 0.00;
  public precioAux: number;
  public arrayAux1: any;
  public arrayAux2: any;
  public productoCarro: Product = new Product();
  public quantityOld: any = 0;
  public preciocarro: any;
  public preciocarro_mob: any;

  public login: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductService, private _global: AppGlobals, private orderService: OrderService) { }

  ngOnInit() {

    if (localStorage.getItem('token')) {
      this.login = true;
      
    }

    var precioCarroNavbar = document.getElementById('preciocarro');
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');


    this.precioTotal = JSON.parse(localStorage.getItem("precioCarro"));
    precioCarroNavbar.innerHTML = String(Math.round((this.precioTotal) * 100) / 100);
    precioCarroNavbarMob.innerHTML = String(Math.round((this.precioTotal) * 100) / 100);

    if (this.products == null || this.products === undefined || this.products.length == 0) {
      precioCarroNavbar.innerHTML = '0.00';
      precioCarroNavbarMob.innerHTML = '0.00';

    }

    this.params = this.activatedRoute.params
      .subscribe(params => this.id = params['id']);

    this.productService.getProduct(this.id).subscribe(
      data => {
        // console.log(data);
        this.product.description = data['description'];
        this.product.title = data['title'];
        this.product.imageLink = data['imageLink'];
        this.product.price = data['price'];
        this.product.madeIn = data['madeIn'];
        this.product.id = data['id'];
        this.product.category = data['category'];
        this.product.iva = data['iva'];
        this.product.provider = data['provider'];
        this.product.price_sin_iva = data['price_sin_iva'];
        this.product.tech_sheet = data['tech_sheet'];
    /*    
        var productarr = this.product.provider.split(',');
        var productprovider;
        var productsplit = [];
        var sumaiva;
        productarr.forEach((item, index) => {
          productsplit = item.split('-');
    
          productprovider = productsplit[2];
    
          if (productprovider == '1') {
            this.product.price_sin_iva = parseFloat(String(productsplit[0]));
            this.product.iva = productsplit[1];
            sumaiva = parseFloat(String(this.product.price_sin_iva * this.product.iva / 100));
            this.product.price = this.product.price_sin_iva + sumaiva;
          }
    
    
        });*/

      },
      error => console.log(<any>error));


    

    // console.log(this.product);

  }

  toastNoLogin(){
    var x = document.getElementById("toast-user");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  addQuantity() {
    this.quantity = this.quantity + 1;

    return this.product;

  }

  quantityReset() {
    this.quantity = 0;
    return '';
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
      this.productoCarro.title = this.product.title;
      this.productoCarro.imageLink = this.product.imageLink;
      this.productoCarro.priceAmount = this.productoCarro.price * this.productoCarro.quantity;
      this.productoCarro.iva = this.product.iva;
      this.productoCarro.price_sin_iva = this.product.price_sin_iva;

      this._global.arrayProductosCart.push(this.productoCarro);

      localStorage.setItem("arrayProductosCarro", JSON.stringify(this._global.arrayProductosCart));

      this.product.price = this.precioAux;

      this.sumarPrecioCarro(JSON.parse(localStorage.getItem("arrayProductosCarro")));

      var x = document.getElementById("toast");
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);

      this.orderService.addProducts(0, localStorage.getItem('token'), JSON.stringify(this._global.arrayProductosCart)).subscribe((data: any) => {
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
    precioCarroNavbar.innerHTML = String(this.precioTotal.toFixed(2));
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');
    precioCarroNavbarMob.innerHTML = String(this.precioTotal.toFixed(2));
    localStorage.setItem("precioCarro", JSON.stringify(this.precioTotal.toFixed(2)));
    //  console.log(this.precioTotal);
    return parseFloat(this.precioTotal.toFixed(2));

  }

  isButtonDisabled(quantity: number) {

    if (quantity > 0) {
      return false;
    } else {
      return true;
    }
  }

  navigateTo(route: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route );
    this.router.navigateByUrl(lang + route );
  }



}
