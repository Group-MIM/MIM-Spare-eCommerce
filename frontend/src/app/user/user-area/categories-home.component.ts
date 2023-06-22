import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'ng-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.css']
})
export class CategoriesHomeComponent implements OnInit {
  categories: Observable<any>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();

  }

  save1() {
    console.log($("#cat1select").val());
    var categoria_id = $("#cat1select").val();
    this.categoryService.saveCategoryHome(1, categoria_id).subscribe((data: any) => {
      console.log(data);
      alert("Categoria actualitzada correctamente.");

    }, (error: any) => {
      console.log(error);
      alert("Problemas al actualizar la categoria.");

    });
  }

  save2() {
    console.log($("#cat2select").val());
    var categoria_id = $("#cat2select").val();
    this.categoryService.saveCategoryHome(2, categoria_id).subscribe((data: any) => {
      console.log(data);
      alert("Categoria actualitzada correctamente.");

    }, (error: any) => {
      console.log(error);
      alert("Problemas al actualizar la categoria.");

    });
  }

  save3() {
    console.log($("#cat3select").val());
    var categoria_id = $("#cat3select").val();
    this.categoryService.saveCategoryHome(3, categoria_id).subscribe((data: any) => {
      console.log(data);
      alert("Categoria actualitzada correctamente.");

    }, (error: any) => {
      console.log(error);
      alert("Problemas al actualizar la categoria.");

    });
  }

  save4() {
    console.log($("#cat4select").val());
    var categoria_id = $("#cat4select").val();
    this.categoryService.saveCategoryHome(4, categoria_id).subscribe((data: any) => {
      console.log(data);
      alert("Categoria actualitzada correctamente.");

    }, (error: any) => {
      console.log(error);
      alert("Problemas al actualizar la categoria.");

    });
  }

  save5() {
    console.log($("#cat5select").val());
    var categoria_id = $("#cat5select").val();
    this.categoryService.saveCategoryHome(5, categoria_id).subscribe((data: any) => {
      console.log(data);
      alert("Categoria actualitzada correctamente.");

    }, (error: any) => {
      console.log(error);
      alert("Problemas al actualizar la categoria.");

    });
  }

  save6() {
    console.log($("#cat6select").val());
    var categoria_id = $("#cat6select").val();
    this.categoryService.saveCategoryHome(6, categoria_id).subscribe((data: any) => {
      console.log(data);
      alert("Categoria actualitzada correctamente.");

    }, (error: any) => {
      console.log(error);
      alert("Problemas al actualizar la categoria.");

    });
  }

}
