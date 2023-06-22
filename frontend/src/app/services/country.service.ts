import { Injectable, Component } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  apiUrl: string = this.globals.apiUrl + 'countries';

  constructor(private globals: AppGlobals, private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
