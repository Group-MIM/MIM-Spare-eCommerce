import { Injectable, Component } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root',
})

@Component({
  templateUrl: './service.html',
  providers: [AppGlobals]
})
export class FileUploadService {
  
  apiUrl: string = this.globals.apiUrl + 'uploadfile';

  constructor(private globals: AppGlobals, private http: HttpClient) { }

  postFile(fileToUpload: any): Observable<any> {

    return this.http.post(this.apiUrl, fileToUpload)
      .catch((error: any) => Observable.throw(error || { message: 'Error del servidor.' }));
  }
}
