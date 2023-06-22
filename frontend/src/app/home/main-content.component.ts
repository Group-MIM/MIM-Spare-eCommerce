import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs/Rx';
import { AppGlobals } from '../../app/app.global';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
  providers: [AppGlobals]
})
export class MainContentComponent implements OnInit {
  urlProd: any = this.global.apiUrl;
  category1: Category = {
    name: null,
    description: null,
    image: null
  };
  category2: Category = {
    name: null,
    description: null,
    image: null
  };
  category3: Category = {
    name: null,
    description: null,
    image: null
  };
  category4: Category = {
    name: null,
    description: null,
    image: null
  };
  category5: Category = {
    name: null,
    description: null,
    image: null
  };
  category6: Category = {
    name: null,
    description: null,
    image: null
  };

  constructor(private router: Router, private global: AppGlobals, private productService: ProductService, private categoryService: CategoryService) { }

  navigateTo(route: any, id: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route + id);
    this.router.navigateByUrl(lang + route + id);
  }

  navigateToContact(route: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route);
    this.router.navigateByUrl(lang + route);
  }

  ngOnInit() {
    this.getCategoriesHome();

  }

  getCategoriesHome() {
    this.categoryService.getCategoryHome(1).subscribe(
      data => {
        // console.log(data);
        this.category1.name = data['name'];
        this.category1.description = data['description'];
        this.category1.image = data['image'];


      },
      error => console.log(<any>error));

    this.categoryService.getCategoryHome(2).subscribe(
      data => {
        // console.log(data);
        this.category2.name = data['name'];
        this.category2.description = data['description'];
        this.category2.image = data['image'];


      },
      error => console.log(<any>error));

    this.categoryService.getCategoryHome(3).subscribe(
      data => {
        // console.log(data);
        this.category3.name = data['name'];
        this.category3.description = data['description'];
        this.category3.image = data['image'];


      },
      error => console.log(<any>error));

    this.categoryService.getCategoryHome(4).subscribe(
      data => {
        // console.log(data);
        this.category4.name = data['name'];
        this.category4.description = data['description'];
        this.category4.image = data['image'];


      },
      error => console.log(<any>error));

    this.categoryService.getCategoryHome(5).subscribe(
      data => {
        // console.log(data);
        this.category5.name = data['name'];
        this.category5.description = data['description'];
        this.category5.image = data['image'];


      },
      error => console.log(<any>error));

    this.categoryService.getCategoryHome(6).subscribe(
      data => {
        // console.log(data);
        this.category6.name = data['name'];
        this.category6.description = data['description'];
        this.category6.image = data['image'];


      },
      error => console.log(<any>error));


  }

}
