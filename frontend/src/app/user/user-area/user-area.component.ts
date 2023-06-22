import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Product } from '../../models/product';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css']
})
export class UserAreaComponent implements OnInit {

  user: User = {
    id: null,
    name: null,
    email: null,
    password: null,
    role: null

  }
  id: number;
  public precioTotal: number = 0.00;
  public products: Array<Product> = [];
  public quantityProducts: number;
  public orders: Observable<any>;

  constructor(private router: Router, private userService: UserService, private orderService: OrderService) {


  }

  ngOnInit() {
    
    this.orders = this.orderService.getProducts(0, localStorage.getItem("token"));

    this.orders.forEach(function (element) {

      if (typeof element[0] !== 'undefined' && element[0].length > 0) {
        localStorage.setItem("arrayProductosCarro", JSON.stringify(JSON.parse(element[0][0]['cart'])));

      } else {
        localStorage.setItem("arrayProductosCarro", '[]');

      }


    });

    this.id = parseInt(localStorage.getItem('token'));
    this.getUser(this.id);

    this.products = JSON.parse(localStorage.getItem("arrayProductosCarro"));

    this.quantityProducts = this.products.length > 0 ? this.products.length : 0;


    $("#option-user-data").click(function () {
      $("#user-data-component").removeClass('d-none');
      $("#user-order-component").addClass('d-none');
      $("#users-management-component").addClass('d-none');
      $("#stock-management-component").addClass('d-none');
      $("#categories-home-component").addClass('d-none');

    });

    $("#option-user-order").click(function () {
      $("#user-order-component").removeClass('d-none');
      $("#user-data-component").addClass('d-none');
      $("#users-management-component").addClass('d-none');
      $("#stock-management-component").addClass('d-none');
      $("#categories-home-component").addClass('d-none');

    });

    $("#option-users-management").click(function () {
      $("#users-management-component").removeClass('d-none');
      $("#user-order-component").addClass('d-none');
      $("#user-data-component").addClass('d-none');
      $("#stock-management-component").addClass('d-none');
      $("#categories-home-component").addClass('d-none');


    });

    $("#stock-management").click(function () {
      $("#stock-management-component").removeClass('d-none');
      $("#user-order-component").addClass('d-none');
      $("#user-data-component").addClass('d-none');
      $("#users-management-component").addClass('d-none');
      $("#categories-home-component").addClass('d-none');

    });

   /* $("#products-home").click(function () {
      $("#stock-management-component").addClass('d-none');
      $("#user-order-component").addClass('d-none');
      $("#user-data-component").addClass('d-none');
      $("#users-management-component").addClass('d-none');
      $("#products-home-component").removeClass('d-none');

    });*/

    $("#categories-home").click(function () {
      $("#stock-management-component").addClass('d-none');
      $("#user-order-component").addClass('d-none');
      $("#user-data-component").addClass('d-none');
      $("#users-management-component").addClass('d-none');
      $("#categories-home-component").removeClass('d-none');

    });



  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe((data: any) => {
      this.user.name = data[0]['name'];
      this.user.email = data[0]['email'];
      this.user.avatar = data[0]['avatar'];
      this.user.password = data[0]['password'];
      this.user.direccion = data[0]['direccion'];
      this.user.provincia = data[0]['provincia'];
      this.user.municipio = data[0]['municipio'];
      this.user.codigo_postal = data[0]['codigo_postal'];
      this.user.direccion_alt = data[0]['direccion_alt'];
      this.user.provincia_alt = data[0]['provincia_alt'];
      this.user.municipio_alt = data[0]['municipio_alt'];
      this.user.codigo_postal_alt = data[0]['codigo_postal_alt'];
      this.user.telefono = data[0]['telefono'];
      this.user.role = data[0]['role'];

      if (this.user.role == 'user' || this.user.role == 'admin') {
        $("#option-user-order").removeClass('d-none');
      }

      if (this.user.role == 'adminges' || this.user.role == 'admin') {
        $("#stock-management").removeClass('d-none');
      }

      if (this.user.role == 'admintrans' || this.user.role == 'admin') {
        $("#option-user-order").removeClass('d-none');
      }

      if (this.user.role == 'admin') {
        $("#option-user-order").removeClass('d-none');
        $("#stock-management").removeClass('d-none');
        $("#option-users-management").removeClass('d-none');
        $("#categories-home").removeClass('d-none');

      }

    }, (error: any) => {
      console.log(error);
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('__paypal_storage__');
    localStorage.removeItem('arrayProductosCarro');
    localStorage.removeItem('precioCarro');
    $("#user-area-navbar").addClass("d-none");
    $("#login-navbar").removeClass("d-none");

      $("#user-area-navbar").addClass("d-none");
      $("#login-navbar").removeClass("d-none");
      $("#user-area-navbar-mob").addClass("d-none");
      $("#login-navbar-mob").removeClass("d-none");
    

    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + "/home");
    this.router.navigateByUrl(lang + "/home");
  }


}
