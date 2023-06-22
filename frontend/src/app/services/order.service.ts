import { Injectable, Component } from '@angular/core';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Order } from '../models/order';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})

@Component({
  templateUrl: './service.html',
  providers: [AppGlobals]
})
export class OrderService {

  apiUrl: string = this.globals.apiUrl + 'orders';

  constructor(private globals: AppGlobals, private http: HttpClient) {
  }

  getProducts(complete: any, user_id: any): Observable<any> {
    console.log(JSON.parse(user_id));
console.log(this.apiUrl + "/getProducts/" + complete);
    return this.http.post(this.apiUrl + "/getProducts/" + complete, JSON.parse(user_id))
      .catch((error: any) => Observable.throw(error || { message: 'Error del servidor.' }));

  }

  addProducts(complete: any, user_id: any, products: any) {

    var res = this.http.post(this.apiUrl + "/guardarCarro/" + complete + "/" + user_id, JSON.parse(products));
      

    return res;

  }

  guardarDatosCliente(user_id: any, datos: any) {
    console.log(datos);
    return this.http.post(this.apiUrl + "/save/guardarDatosCliente/" + user_id, JSON.parse(datos));

  }

  getInvoiceData(id_inv: any): Observable<any> {
    return this.http.get(this.apiUrl + "/getInvoiceData/" + id_inv);
  }

  cambiarEstado(id: any, estado: any) {
    return this.http.get(this.apiUrl + "/cambiarEstado/" + id + "/" + estado);
  }
}
