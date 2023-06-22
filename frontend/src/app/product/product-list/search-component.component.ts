import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'ng-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {
  public buscar: any = '';
  @Output() palabraBuscar: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.search();
    }
  }

  search() {
    this.buscar = $("#text_search").val();
    $('input[type="checkbox"]').prop('checked', false);

    this.palabraBuscar.emit(this.buscar);

  }

}
