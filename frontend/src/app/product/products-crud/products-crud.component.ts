import { Component, Input, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Component({
  selector: 'ng-products-crud',
  templateUrl: './products-crud.component.html',
  styleUrls: ['./products-crud.component.css'],
  providers: [AppGlobals]
})
export class ProductsCrudComponent implements OnInit {
  @Input() product: Product;
  public quantity: any = 0;
  public quantityOld: any = 0;
  public productsCart: any[] = [];
  public carrologo: any;
  public hover: boolean = false;
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

  constructor(private router: Router, private translate: TranslateService, private productService: ProductService, private _global: AppGlobals) { }

  ngOnInit() {
  }

  deleteProduct(id: any) {
    var seguroBorrar = this.translate.instant('seguro_desea_eliminar.texto');
    if (confirm(seguroBorrar)) {
      this.productService.deleteProduct(id).subscribe((data: any) => {
        location.reload();
      }, (error: any) => {
        console.log(error);
      });
    }


  }


  navigateTo(route: any, id: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route + id);
    this.router.navigateByUrl(lang + route + id);
  }

}
