import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as $ from 'jquery';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ng-filter-cat',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterCategoryComponent implements OnInit {
  @Input() productsAll: Observable<Object>;
  public arrayProductos: Array<any> = [];
  public filtros: any = [
    {
      precio: [],
      origen: []
    }
  ];
  filtro: string;
  public filtroOrigenRadioAll: Array<string> = [];
  public filtroOrigenRadio: Array<string> = [];
  public filtroPrecioRadio: Array<string> = ["1€ - 5€", "5,1€ - 10€", "10,1€ - 20€", "20,1€ - 50€", "50,1€ - 100€"];
  public cantidadProductos: number = 0;
  public filtroCategoriaRadioAll: Array<string> = [];
  public filtroCategoriaRadio: Array<string> = [];

  @Output() arrayFiltros: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rellenarFiltros();
    });
  }

  verTodos() {
    this.filtros.find(function (element: any) {
      element.origen = null;
      element.precio = null;
    });
    $('input[type="checkbox"]').prop('checked', false);
    this.filtrarProductos();
  }

  filtrarProductos(): void {
    var precio = [];

    $.each($("input[name='fprecio']:checked"), function () {
      precio.push($(this).val());
    });

    this.filtros.find(function (element: any) {
      element.precio = precio;
    });

    this.arrayFiltros.emit(this.filtros);

    if (window.screen.width <= 991 || window.innerWidth <= 991) {
      $(".filtros-container").addClass('d-none');

    }

  }

  rellenarFiltros(): void {

    this.productsAll.forEach((item) => {
      this.arrayProductos[0] = item;
      this.arrayProductos = this.arrayProductos[0];
      this.cantidadProductos = this.arrayProductos.length;
      //llenar origen con los productos que hay
      for (let index = 0; index < this.cantidadProductos; index++) {
        console.log(item[index]);
        const element = item[index];
        this.filtroOrigenRadioAll.push(element['madeIn']);
        this.filtroCategoriaRadioAll.push(element['category']);

      }
      //quitar repetidos
      this.filtroOrigenRadio = this.filtroOrigenRadioAll.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
      this.filtroCategoriaRadio = this.filtroCategoriaRadioAll.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);

    });
    
  }


}
