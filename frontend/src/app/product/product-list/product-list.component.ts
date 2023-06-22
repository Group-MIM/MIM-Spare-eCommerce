import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs/Rx';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Observable<Object>;
  //product: Observable<Object>;
  cantidadProductos: number = 0;
  arrayProductos: Array<any> = [];
  pageActual: number = 1;
  user: User = {
    id: null,
    name: null,
    email: null,
    password: null,
    role: null

  }
  filtros: Array<any> = [{ precio: "null", categoria: "null", origen: "null" }];

  constructor(private router: Router, private userService: UserService, private productService: ProductService) { }

  ngOnInit() {
    this.getUser(parseInt(localStorage.getItem('token')));

    if (localStorage.getItem('productosFromHome') != null) {
      this.products = this.productService.getProductSearch(localStorage.getItem('productosFromHome'));
      localStorage.removeItem('productosFromHome');
    } else {
      this.products = this.productService.getProducts();

    }

    this.products.forEach((item) => {
      this.arrayProductos[0] = item;
      this.arrayProductos = this.arrayProductos[0];
      this.cantidadProductos = this.arrayProductos.length;

    });


  


    if (window.screen.width <= 991 || window.innerWidth <= 991) {
      $(".filtros-container").addClass('d-none');
      $(".container-gallery").removeClass("justify-content-between");
      $(".container-gallery").addClass("justify-content-center");
      $(".btn-filtro").removeClass("d-none");

    } else {
      $(".filtros-container").removeClass('d-none');
      $(".container-gallery").addClass("justify-content-between");
      $(".container-gallery").removeClass("justify-content-center");
      $(".btn-filtro").addClass("d-none");

    }

    $(".btn-filtro").click(function () {
      if ($(".filtros-container").hasClass('d-none')) {
        $(".filtros-container").removeClass('d-none');
      } else {
        $(".filtros-container").addClass('d-none');
      }

    });

  }

  onPageChange(page: number) {
    this.pageActual = page;
    window.scrollTo(0, 0);
  }

  onResize(event) {
    if (window.screen.width <= 991 || event.target.innerWidth <= 991) {
      //   $(".filtros-container").addClass('d-none');
      $(".container-gallery").addClass("justify-content-center");
      $(".container-gallery").removeClass("justify-content-between");
      $(".btn-filtro").removeClass("d-none");

    } else {
      $(".filtros-container").removeClass('d-none');
      $(".container-gallery").removeClass("justify-content-center");
      $(".container-gallery").addClass("justify-content-between");
      $(".btn-filtro").addClass("d-none");

    }
  }

  getUser(id: number) {
    if (id > 0) {
      this.userService.getUserById(id).subscribe((data: any) => {
        this.user.role = data[0]['role'];
      }, (error: any) => {
        console.log(error);
      });
    }

  }

  recibirFiltros(filtros: Array<string>): void {
    console.log(filtros[0]['precio'] == null);
    console.log(filtros[0]['origen'] == null);
    console.log(filtros[0]['categoria'] == null);


    if (filtros[0]['precio'] == null) { filtros[0]['precio'] = "null" }
    if (filtros[0]['categoria'] == null) { filtros[0]['categoria'] = "null" }
    if (filtros[0]['origen'] == null) { filtros[0]['origen'] = "null" }

    this.products = this.productService.getProductsByFilter(filtros[0]);

    this.products.forEach((item) => {
      this.arrayProductos[0] = item;
      this.arrayProductos = this.arrayProductos[0];
      this.cantidadProductos = this.arrayProductos.length;

    });

    this.filtros = filtros;

  }

  recibirOrdenacion(ordenarPor: string): void {

    console.log(this.filtros[0]);

    this.products = this.productService.getProductsSortBy(
      ordenarPor,
      this.filtros[0]['precio'],
      this.filtros[0]['categoria'],
      this.filtros[0]['origen']
    );

    this.products.forEach((item) => {
      this.arrayProductos[0] = item;
      this.arrayProductos = this.arrayProductos[0];
      this.cantidadProductos = this.arrayProductos.length;

    });

  }

  recibirBusqueda(palabraBuscar: any): void {
    if (palabraBuscar == '') {
      palabraBuscar = 'empty';
    }

    this.products = this.productService.getProductSearch(palabraBuscar);

    this.products.forEach((item) => {
      this.arrayProductos[0] = item;
      this.arrayProductos = this.arrayProductos[0];
      this.cantidadProductos = this.arrayProductos.length;

    });
  }

  navigateTo(route: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route);
    this.router.navigateByUrl(lang + route);
  }


}
