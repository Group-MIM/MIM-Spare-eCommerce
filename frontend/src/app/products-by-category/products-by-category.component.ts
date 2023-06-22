import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'ng-product-list',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent implements OnInit {
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
  title: string;
  description: string;
  filtros: Array<any> = [{ precio: "null", categoria: "null", origen: "null" }];
  categoria: any;

  constructor(private translate: TranslateService, private route: ActivatedRoute, private userService: UserService, private productService: ProductService) { }

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.categoria = params['category'];

      if (this.categoria == 'epi') {
        this.categoria = 'categoria_01';

      } else if (this.categoria == 'maquinaria') {
        this.categoria = 'categoria_02';

      } else if (this.categoria == 'motor') {
        this.categoria = 'categoria_03';

      } else if (this.categoria == 'stock') {
        this.categoria = 'categoria_04';

      } else if (this.categoria == '') {
        this.categoria = 'categoria_05';

      } else if (this.categoria == '-') {
        this.categoria = 'categoria_06';

      }


      this.getUser(parseInt(localStorage.getItem('token')));

      this.products = this.productService.getProductsByCategory(this.categoria).map(res => {
        console.log(res);
        return res;
      });

      console.log(this.products);
      this.products.forEach((item) => {
        this.arrayProductos[0] = item;
        this.arrayProductos = this.arrayProductos[0];
        this.cantidadProductos = this.arrayProductos.length;
      });
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

    if (filtros[0]['precio'].length === 0) { filtros[0]['precio'] = "null" }
    filtros[0]['origen'] = ["null"];
    var category = "";

    this.route.params.subscribe(params => {


      if (params['category'] == 'lactis') {
        category = 'categoria_01';

      } else if (params['category'] == 'fruites') {
        category = 'categoria_02';

      } else if (params['category'] == 'basics') {
        category = 'categoria_03';

      } else if (params['category'] == 'elaborats') {
        category = 'categoria_04';

      } else if (params['category'] == 'begudes') {
        category = 'categoria_05';

      } else if (params['category'] == 'llegums') {
        category = 'categoria_06';

      }
      filtros[0]['categoria'] = [category];
    });

    this.products = this.productService.getProductsByFilter(filtros[0]);

    this.products.forEach((item) => {
      this.arrayProductos[0] = item;
      this.arrayProductos = this.arrayProductos[0];
      this.cantidadProductos = this.arrayProductos.length;

    });

    this.filtros = filtros;

  }

  recibirOrdenacion(ordenarPor: string): void {

    this.categoria = this.route.params.subscribe(params => {
      this.categoria = params['category']; // (+) converts string 'id' to a number

      if (this.categoria == 'lactis') {
        this.categoria = 'categoria_01';
      } else if (this.categoria == 'fruites') {
        this.categoria = 'categoria_02';
      } else if (this.categoria == 'basics') {
        this.categoria = 'categoria_03';
      } else if (this.categoria == 'elaborats') {
        this.categoria = 'categoria_04';
      } else if (this.categoria == 'begudes') {
        this.categoria = 'categoria_05';
      } else if (this.categoria == 'llegums') {
        this.categoria = 'categoria_06';
      }

      this.filtros[0]['categoria'] = [this.categoria];

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


}
