import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})

@Component({
  templateUrl: './service.html',
  providers: [AppGlobals]
})
export class MailService {
  
  apiUrl: string = this.globals.apiUrl + 'mail';

  constructor(private globals: AppGlobals, private http: HttpClient) { }

  sendMail(params: any) {

    var res = this.http.post(this.apiUrl, params);
      
    return res;
  }

  resetPass(params: any) {
    console.log(params);
    var res = this.http.post(this.apiUrl + "/reset", params);
    return res;
  }

  verificarUsuario(email: any): Observable<any> {
    var res = this.http.get(this.apiUrl + "/verify/" + email.trim());
    return res;
  }

  confirmarCompra(email: any, importe: any) {
    var res = this.http.get(this.apiUrl + "/confirmarcompra/" + email + "/" + importe);
    return res;
  }
}
