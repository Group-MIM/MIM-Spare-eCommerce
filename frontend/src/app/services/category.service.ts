import { Injectable, Component } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl: string = this.globals.apiUrl + 'categories';

  constructor(private globals: AppGlobals, private http: HttpClient) {
  }

  saveCategoryHome(category_num: any, id_category: any) {
    return this.http.get(this.apiUrl + "/" + category_num + "/" + id_category);
  }

  getCategoryHome(id: any): Observable<any> {
    return this.http.get(this.apiUrl + "/categoryHome/get/" + id);
  }

  getCategories(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }
}
