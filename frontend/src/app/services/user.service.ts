import { Injectable, Component } from '@angular/core';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Rx';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})

@Component({
  templateUrl: './service.html',
  providers: [AppGlobals]
})

export class UserService {
  apiUrl: string = this.globals.apiUrl + 'users';
  

  constructor(private globals: AppGlobals, private http: HttpClient) {}

  addUser(usuario: User): Observable<any> {
   

    return this.http.post(this.apiUrl, usuario)
      .catch((error: any) => Observable.throw(error || { message: 'Error del servidor.' }));

  }

  editUser(usuario: User): Observable<any> {
    console.log(this.apiUrl + "/update/" + usuario.id);
    return this.http.put(this.apiUrl + "/update/" + usuario.id, usuario);
  }

  loginUser(usuario: User): Observable<any> {
    return this.http.get(this.apiUrl + "/login/" + usuario.email + "/" + usuario.password);
  }

  getUserById(id: number) {
    return this.http.get(this.apiUrl + "/" + id);
  }

  getUserByToken(token: any){
    return this.http.get(this.apiUrl + "/get/token/" + token);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + id);
  }

}
