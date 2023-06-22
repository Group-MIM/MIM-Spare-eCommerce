import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'ng-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  public palabra_buscar: any = '';
  carouselForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private productService: ProductService) { 
    this.carouselForm = fb.group({
      'text_search': ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  navigateTo(route: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route );
    this.router.navigateByUrl(lang + route );
  }

  saveData() {
    this.palabra_buscar = this.carouselForm.value['text_search'];
    console.log( this.palabra_buscar);

    localStorage.setItem("productosFromHome", this.palabra_buscar);

    this.navigateTo('/products');
  }



}
 