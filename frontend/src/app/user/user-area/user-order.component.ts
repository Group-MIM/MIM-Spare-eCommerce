import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs/Rx';
import { User } from '../../models/user';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  @Input() user: User;
  orders: Observable<Object>;
  array_orders: Array<any> = [];
  pageActual: number = 1;

  constructor(private router: Router, private translate: TranslateService, private orderService: OrderService) { }

  ngOnInit() {
    this.orders = this.orderService.getProducts(1, localStorage.getItem("token"));

    this.orders.forEach(element => {
      this.array_orders = element[0];
      console.log(element[0]);
    });

  }

  navigateTo(route: any, id: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route + id);
    this.router.navigateByUrl(lang + route + id);
  }


  onPageChange(page: number) {
    this.pageActual = page;
    window.scrollTo(0, 0);
 }

  showState(e) {
    $(e.currentTarget).find('.state_text').toggleClass('d-none');
  }

  cambiarEstado(id: any, estado: any) {
    this.orderService.cambiarEstado(id, estado).subscribe((data: any) => {
      //  location.reload();
    }, (error: any) => {
      console.log(error);
    });


  }

}

