import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-add-product-button',
  templateUrl: './add-product-button.component.html',
  styleUrls: ['./add-product-button.component.css']
})
export class AddProductButtonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(route: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route );
    this.router.navigateByUrl(lang + route);
  }

}
