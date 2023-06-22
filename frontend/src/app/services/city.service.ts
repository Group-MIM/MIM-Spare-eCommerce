import { Injectable, Component } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  apiUrl: string = this.globals.apiUrl + 'cities';

  constructor(private globals: AppGlobals, private http: HttpClient) { }

  getCities(id: any): Observable<any> {
    return this.http.get(this.apiUrl + "/" + id);
  }
}
