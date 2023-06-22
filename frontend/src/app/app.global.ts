import { Injectable } from '@angular/core';
import { Product } from './models/product';

@Injectable()
export class AppGlobals {
  public arrayProductos: Array<Product> = [];
  public arrayProductosCart: Array<Product> = [];

  //strings y rutas
  public localimagepath: string = "https://api.mimspare.com/public/img/";
  public apiUrl: string = "https://api.mimspare.com/public/api/";
  //public apiUrl: string = "http://localhost:8000/api/";
  //public localimagepath: string = "http://localhost:8000/img/";
}

