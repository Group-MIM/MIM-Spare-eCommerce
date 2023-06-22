import { Injectable, Component } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Region } from '../models/region';
import { AppGlobals } from '../app.global';
@Injectable({
  providedIn: 'root'
})
export class RegionService {

  apiUrl: string = this.globals.apiUrl + 'regions';

  constructor(private globals: AppGlobals, private http: HttpClient) { }

  getRegions(code: any): Observable<any> {
    return this.http.get(this.apiUrl + "/" + code);
  }
}
