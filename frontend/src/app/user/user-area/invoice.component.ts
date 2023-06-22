import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ng-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  @Input() invoice: any;
  orders: Array<any> = [];
  products: Observable<Object>;
  precio_sin_iva: number = 0.00;
  id: any;
  split1: any;
  precio_total: any = 0.00;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private productService: ProductService) { }

  ngOnInit() {
    $(document).ready(function () {
      $(".footer").addClass('d-none');
    });

    this.getInvoiceData(this.route.snapshot.paramMap.get("id"));
  }

  ngOnDestroy(): void {
    $(document).ready(function () {
      $(".footer").removeClass('d-none');
    });

  }

  getInvoiceData(id_inv) {
    this.orderService.getInvoiceData(id_inv).subscribe((data: any) => {
      this.id = id_inv;
      this.invoice = data[0];
      this.split1 = data[0]['products_table'].split("|");


      for (let index = 0; index < this.split1.length; index++) {

        this.orders.push(this.split1[index].split("-"));

        if (this.orders[index][0] == '') {
          this.orders.pop();
        } else {
          this.products = this.productService.showByName(this.orders[index][0]);

          this.products.forEach((item) => {
            console.log(item);
            this.orders[index].push(item[0]['iva']);
            this.orders[index].push(item[0]['price_sin_iva']);

          });
        }
      }

      this.precio_total = (+this.invoice.price + +this.invoice.precio_envio).toFixed(2);

    }, (error: any) => {
      console.log(error);
    });
  }

}



