import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  user: User = {
    id: null,
    name: null,
    email: null,
    password: null,
    role: null

  }
  id: number;
  mobile: boolean = false;
  public lang: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {

    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    this.lang = ruta_arr[1];

    if (window.screen.width <= 991 || window.innerWidth <= 991) {
      $("#mob_user_cart").removeClass('d-none');
      $("#desk_user").addClass('d-none');
      $("#desk_cart").addClass('d-none');
      $(".navbar").removeClass('height-50');
      $(".logo-nav").removeClass('margin-top-18');


    } else {
      $("#mob_user_cart").addClass('d-none');
      $("#desk_user").removeClass('d-none');
      $("#desk_cart").removeClass('d-none');
      $(".navbar").addClass('height-50');
      $(".logo-nav").addClass('margin-top-18');


    }

    $(document).ready(function () {
      $('.nav-link').click(function () {
        $('#navbarTogglerDemo02').removeClass('show');
      });

      $('nav li').click(function () {
        $(window).scrollTop(0);
      });
    });

    if (localStorage.getItem('token') != null) {

        this.id = parseInt(localStorage.getItem('token'));
        this.getUser(this.id);
  
        
      }
   
    

  }

  onResize(event) {
    if (window.screen.width <= 991 || event.target.innerWidth <= 991) {
      $("#mob_user_cart").removeClass('d-none');
      $("#desk_user").addClass('d-none');
      $("#desk_cart").addClass('d-none');
      $(".navbar").removeClass('height-50');
      $(".logo-nav").removeClass('margin-top-18');

    } else {
      $("#mob_user_cart").addClass('d-none');
      $("#desk_user").removeClass('d-none');
      $("#desk_cart").removeClass('d-none');
      $(".navbar").addClass('height-50');
      $(".logo-nav").addClass('margin-top-18');

    }
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe((data: any) => {
      this.user.avatar = data[0]['avatar'];
      this.user.role = data[0]['role'];

console.log( data[0]);

      if(this.user.avatar != "undefined"){
        $("#user-area-navbar").removeClass("d-none");
        $("#user-area-navbar").attr("src", this.user.avatar);
        $("#login-navbar").addClass("d-none");
        $("#user-area-navbar-mob").removeClass("d-none");
        $("#user-area-navbar-mob").attr("src", this.user.avatar);
        $("#login-navbar-mob").addClass("d-none");
      }

      if (this.user.role == 'admintrans') {
        $("#desk_cart").remove();
        $("#zona-derecha").remove();
        $("#navbar-izq").remove();

      }


    }, (error: any) => {
      console.log(error);
    });
  }

  navigateTo(route: any, categoria: any) {
    if(route == '/login' || route == '/signup'){
      localStorage.removeItem("token");
    }

    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    this.lang = ruta_arr[1];
    console.log(this.lang + route);
    if(categoria == '-'){
      this.router.navigateByUrl(this.lang + route);

    }else{
      this.router.navigate([this.lang + route, categoria]);
    }
  }



}


