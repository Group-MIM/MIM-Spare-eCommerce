import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public user: User = {
    id: null,
    name: null,
    email: null,
    password: null,

  }

  constructor(fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = fb.group({
      'email_login': ['', [Validators.required, Validators.email]],
      'password_login': ['', [Validators.required]],
    });
  }

  login() {
    this.user.email = this.loginForm.value['email_login'];
    this.user.password = this.loginForm.value['password_login'];

    this.userService.loginUser(this.user).subscribe((data: any) => {
      if (typeof data[0] !== 'undefined') {
        var active = data[0]['active'];
        if (active != 1) {
          $("#signup-incomplete-block").removeClass("d-none");
          $("#formContent").addClass("d-none");
        } else {
          localStorage.setItem('token', data[0]['id']);
          this.getUser(data[0]['id']);

          var path = window.location.pathname;
          var ruta_arr = path.split("/");
          var lang = ruta_arr[1];
        //  window.location.href = lang + "/home";
       //   console.log(lang + "/home");
          
          
          if(this.user.avatar != "undefined"){
            $("#user-area-navbar").removeClass("d-none");
            $("#user-area-navbar").attr("src", this.user.avatar);
            $("#login-navbar").addClass("d-none");
            $("#user-area-navbar-mob").removeClass("d-none");
            $("#user-area-navbar-mob").attr("src", this.user.avatar);
            $("#login-navbar-mob").addClass("d-none");
          }
        }

      } else {
        $("#error-login").removeClass("d-none");
        $("#email").css("border-bottom", "2px solid #D03634");
        $("#password").css("border-bottom", "2px solid #D03634");

      }
      //this.router.navigateByUrl(lang + "/home");
      window.location.href=lang + "/home";


    }, (error: any) => {
      console.log(error);
    });
  }

  onKeydown() {
    $("#error-login").addClass("d-none");
    $("#email").css("border-bottom", "");
    $("#password").css("border-bottom", "");
  }

  getUser(id: number) {
    var user = this.user;
    this.userService.getUserById(id).subscribe((data: any) => {
      this.user.name = data[0]['name'];
      this.user.email = data[0]['email'];
      this.user.avatar = data[0]['avatar'];
      this.user.password = data[0]['password'];

    }, (error: any) => {
      console.log(error);
    });
  }

  navigateTo(route: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route);
    this.router.navigateByUrl(lang + route);
  }

  ngOnInit() {
  }

}
