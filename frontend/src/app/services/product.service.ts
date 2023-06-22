import { Injectable, Component } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})

@Component({
  templateUrl: './service.html',
  providers: [AppGlobals]
})
export class ProductService {

  apiUrl: string = this.globals.apiUrl + 'products';

  constructor(private globals: AppGlobals, private http: HttpClient) {
  }
  getProducts(): any {
    return this.http.get(this.apiUrl);
  }

  saveProductHome(pruduct_num:any, id_product:any){
    return this.http.get(this.apiUrl + "/" + pruduct_num + "/" + id_product);
  }

  getProductsByCategory(category: any): Observable<any> {
    return this.http.get(this.apiUrl + "/category/get/list/" + category);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product)
      .catch((error: any) => Observable.throw(error || { message: 'Error del servidor.' }));
  }

  getProduct(id: String): Observable<any> {
    return this.http.get(this.apiUrl + "/" + id);
  }

  getProductHome(id: any): Observable<any> {
    return this.http.get(this.apiUrl + "/productHome/get/" + id);
  }

  getProductsByFilter(filtros: any): Observable<any> {
    console.log(filtros);
    console.log(this.apiUrl+"/where");
    return this.http.post(this.apiUrl+"/where" , filtros)
    .catch((error: any) => Observable.throw(error || { message: 'Error del servidor.' }));
  }

  getProductsSortBy(sortedBy: string, precio: string, categoria: string, origen: string): Observable<any> {

    return this.http.get(this.apiUrl + "/" + sortedBy + '/' + precio + "/" + categoria + "/" + origen + '/sort');
  }

  updateProduct(product: Product): Observable<any> {
console.log(product);
    const url = this.apiUrl + "/" + product['id'];
    return this.http.put(url, product)
      .catch((error: any) => Observable.throw(error || { message: 'Error del Servidor' }));
  }

  getProductSearch(palabraBuscar: any): any {
    return this.http.get(this.apiUrl + "/" + palabraBuscar + "/search/get");

  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + id);
  }

  showByName(search: any): Observable<any> {
    return this.http.get(this.apiUrl + "/showByName/" + search + "/get");
  }

  restarStock(product_id: any, quantity: any) {
    return this.http.get(this.apiUrl + "/restar/stock/" + product_id + "/" + quantity);
  }

  updateStock(product_id: any, quantity: any) {
    return this.http.get(this.apiUrl + "/update/stock/" + product_id + "/" + quantity);
  }


}
