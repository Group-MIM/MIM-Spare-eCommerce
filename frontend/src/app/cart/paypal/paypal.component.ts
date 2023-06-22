import { Component, OnInit, Input } from '@angular/core';
import { PayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Product } from '../../models/product';
import { OrderService } from '../../services/order.service';
import { MailService } from '../../services/mail.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'ng-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  public payPalConfig?: PayPalConfig;
  public showSuccess: any;
  public products: Array<Product> = JSON.parse(localStorage.getItem("arrayProductosCarro"));
  public jsonObj: any = [];
  public suma: number = 0;
  public user: User = {
    id: null,
  }

  //datos de facturacion 
  public nombre: any;
  public email: any;
  public telefono: any;
  public direccion: any;
  public provincia: any;
  public municipio: any;
  public codigo_postal: any;
  public direccion_alt: any;
  public provincia_alt: any;
  public municipio_alt: any;
  public codigo_postal_alt: any;
  public items: Array<any> = [];
  public tabla_items: any;
  public invoice_data: Array<any> = [];
  public order_id: any;
  public iva: any;
  public precio_sin_iva: any;
  public enviar_direccion_alternativa: boolean = false;
  public precio_envio: number = 0;
  public isGuest: boolean = false;
  public lang: any;

  ngOnInit(): void {
    this.initConfig();

    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    this.lang = ruta_arr[1];

    if(localStorage.getItem('token') == null){
     
     localStorage.setItem('token', String(Date.now()));
     var token_str = localStorage.getItem('token');
     var token_sub = token_str.substr(token_str.length - 5);  
     localStorage.setItem('token', token_sub);  
    }

    if (localStorage.getItem('guestAddress') == null) {
      $("#paypalPaymentMethods").addClass("d-none");
      $("#para_completar_envio").removeClass("d-none");
    } else {
      $("#para_completar_envio").addClass("d-none");
      $("#paypalPaymentMethods").removeClass("d-none");
      this.isGuest = true;
    }

    if(!this.isGuest){
      this.userService.getUserById(parseInt(localStorage.getItem('token'))).subscribe((data: any) => {
        this.direccion_alt = data[0]['direccion_alt'];
        this.provincia_alt = data[0]['provincia_alt'];
        this.municipio_alt = data[0]['municipio_alt'];
        this.codigo_postal_alt = data[0]['codigo_postal_alt'];
  
  
        if (this.direccion_alt == '-' || this.direccion_alt == null || this.direccion_alt == "") {
          $("#paypalPaymentMethods").addClass("d-none");
          $("#para_completar_envio").removeClass("d-none");
        } else {
          $("#para_completar_envio").addClass("d-none");
          $("#paypalPaymentMethods").removeClass("d-none");
        }
  
       
  
  
      }, (error: any) => {
        console.log(error);
      });
    }
   
  }

  constructor(private productService: ProductService, private userService: UserService, private mailService: MailService, private orderService: OrderService) { }

  private productsToJson() {
    var productos = JSON.parse(localStorage.getItem("arrayProductosCarro"));
    for (let index = 0; index < productos.length; index++) {
      const element = productos[index];

      var nuevoprod = {
        name: element.title,
        quantity: String(element.quantity),
        category: 'PHYSICAL_GOODS',
        unit_amount: {
          currency_code: 'EUR',
          value: parseFloat(element.price).toFixed(2),
        }
      };

      this.suma += element.quantity * element.price.toFixed(2);
      //console.log(this.suma.toFixed(2)); 
      this.jsonObj.push(nuevoprod);

      if (this.suma < 50) {
        this.precio_envio = 6;
      } else if (this.suma < 75) {
        this.precio_envio = 4;
      } else if (this.suma < 100) {
        this.precio_envio = 2;
      } else if (this.suma >= 100) {
        this.precio_envio = 0;
      }


    }

    //console.log(this.jsonObj); 
  }

  private initConfig(): void {

    this.payPalConfig = new PayPalConfig({
      currency: 'EUR',
      //sandbox
      //clientId: 'AYQ5IsdJatJWHOew9zaO4CYT2GEkCah39tnk1Kl8lUK_uuYvRknT-2F0qd6bvGWE1O8iD9udDflOpWuc',
      //live
      clientId: 'AVqD8uQ3g_n5LnDDm1axxVF-wbdKHDSX9GtxLemBqJkiGQoxEOhx2NweSH2J2CyYNgmyxzXH8h_K2v4P',
      createOrder: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: (this.suma + this.precio_envio).toFixed(2),
              breakdown: {
                shipping: {
                  currency_code: 'EUR',
                  value: this.precio_envio.toString()
                },
                item_total: {
                  currency_code: 'EUR',
                  value: this.suma.toFixed(2),
                }
              }
            },
            items:
              this.jsonObj
          }
        ]
      },
      advanced: {
        updateOrderDetails: {
          commit: true
        }
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (authdata) => {

        if (this.isGuest) {
          this.orderService.addProducts(1, localStorage.getItem('token'), JSON.stringify(this.products))
            .subscribe((data: any) => {

              this.items = authdata['purchase_units'][0]['items'];

              this.tabla_items = "";
              this.items.forEach(element => {
                this.tabla_items += element['name'] + "-";
                this.tabla_items += element['quantity'] + "-";
                this.tabla_items += element['unit_amount']['value'] + "|";

              });

              this.invoice_data.push(this.user.name);
              this.invoice_data.push(this.user.direccion);
              this.invoice_data.push(this.user.provincia);
              this.invoice_data.push(this.user.municipio);
              this.invoice_data.push(this.user.codigo_postal);
              this.invoice_data.push(this.user.email);
              this.invoice_data.push(this.user.telefono);
              this.invoice_data.push(this.tabla_items);
              this.invoice_data.push(this.enviar_direccion_alternativa);
              this.invoice_data.push(this.user.direccion_alt);
              this.invoice_data.push(this.user.provincia_alt);
              this.invoice_data.push(this.user.municipio_alt);
              this.invoice_data.push(this.user.codigo_postal_alt);
              this.invoice_data.push(this.precio_envio);


              var productos = JSON.parse(localStorage.getItem("arrayProductosCarro"));
              for (let index = 0; index < productos.length; index++) {
                const element = productos[index];
                this.productService.restarStock(element.id, element.quantity).subscribe((data: any) => {
                  console.log(data);
                }, (error: any) => {
                  console.log(error);
                });

              }


              this.orderService.guardarDatosCliente(localStorage.getItem('token'), JSON.stringify(this.invoice_data))
                .subscribe((data: any) => {

                  localStorage.removeItem('__paypal_storage__');
                  localStorage.removeItem('arrayProductosCarro');
                  localStorage.removeItem('precioCarro');
                  localStorage.removeItem('guestAddress');
                  localStorage.removeItem('token');

                  this.mailService.confirmarCompra(this.user.email, this.suma).subscribe((data: any) => {
                    console.log(data);
                    alert("Gracies per comprar a MIM Spare.")
                    location.replace('/');

                  }, (error: any) => {
                    console.log(error);
                    alert("No s'ha pogut enviar el mail de confirmació.")

                  });


                }, (error: any) => {
                  console.log(error);

                  alert("Ha hagut un error durant el procés de compra.")

                });

              this.showSuccess = true;

            }, (error: any) => {
              console.log(error);
            });
        } else {
          this.orderService.addProducts(1, localStorage.getItem('token'), JSON.stringify(this.products))
            .subscribe((data: any) => {

              this.items = authdata['purchase_units'][0]['items'];

              this.tabla_items = "";
              this.items.forEach(element => {
                this.tabla_items += element['name'] + "-";
                this.tabla_items += element['quantity'] + "-";
                this.tabla_items += element['unit_amount']['value'] + "|";

              });

              this.invoice_data.push(this.user.name);
              this.invoice_data.push(this.user.direccion);
              this.invoice_data.push(this.user.provincia);
              this.invoice_data.push(this.user.municipio);
              this.invoice_data.push(this.user.codigo_postal);
              this.invoice_data.push(this.user.email);
              this.invoice_data.push(this.user.telefono);
              this.invoice_data.push(this.tabla_items);
              this.invoice_data.push(this.enviar_direccion_alternativa);
              this.invoice_data.push(this.user.direccion_alt);
              this.invoice_data.push(this.user.provincia_alt);
              this.invoice_data.push(this.user.municipio_alt);
              this.invoice_data.push(this.user.codigo_postal_alt);
              this.invoice_data.push(this.precio_envio);

              this.userService.editUser(this.user).subscribe((data: any) => {
                var productos = JSON.parse(localStorage.getItem("arrayProductosCarro"));
                for (let index = 0; index < productos.length; index++) {
                  const element = productos[index];
                  this.productService.restarStock(element.id, element.quantity).subscribe((data: any) => {
                    console.log(data);
                  }, (error: any) => {
                    console.log(error);
                  });

                }
              }, (error: any) => {
                console.log(error);
              });


              this.orderService.guardarDatosCliente(localStorage.getItem('token'), JSON.stringify(this.invoice_data))
                .subscribe((data: any) => {

                  localStorage.removeItem('__paypal_storage__');
                  localStorage.removeItem('arrayProductosCarro');
                  localStorage.removeItem('precioCarro');
                  
                  this.mailService.confirmarCompra(this.user.email, this.suma).subscribe((data: any) => {
                    console.log(data);
                    
                    alert("Gracies per comprar a MIM Spare.")
                    location.replace('/');

                  }, (error: any) => {
                    console.log(error);
                    alert("No s'ha pogut enviar el mail de confirmació.")

                  });


                }, (error: any) => {
                  console.log(error);

                  alert("Ha hagut un error durant el procés de compra.")

                });

              this.showSuccess = true;

            }, (error: any) => {
              console.log(error);
            });

        }




      },
      onCancel: (data, actions) => {
        this.jsonObj = [];
        this.suma = 0;
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        this.jsonObj = [];
        this.suma = 0;
        console.log('OnError', err);
      },
      onClick: () => {
        this.productsToJson();
        if ($('#check_direccion_alt').is(":checked")) {
          this.enviar_direccion_alternativa = true;
        }

        if (this.isGuest) {

          this.direccion_alt = JSON.parse(localStorage.getItem("guestAddress"))['direccion_alt'];
          this.provincia_alt = JSON.parse(localStorage.getItem("guestAddress"))['provincia_alt'];
          this.municipio_alt = JSON.parse(localStorage.getItem("guestAddress"))['municipio_alt'];
          this.codigo_postal_alt = JSON.parse(localStorage.getItem("guestAddress"))['codigo_postal_alt'];
          this.user.name = JSON.parse(localStorage.getItem("guestAddress"))['name'];
          this.user.direccion_alt = JSON.parse(localStorage.getItem("guestAddress"))['direccion_alt'];
          this.user.provincia_alt = JSON.parse(localStorage.getItem("guestAddress"))['provincia_alt'];
          this.user.municipio_alt = JSON.parse(localStorage.getItem("guestAddress"))['municipio_alt'];
          this.user.email = JSON.parse(localStorage.getItem("guestAddress"))['email'];
          this.user.telefono = JSON.parse(localStorage.getItem("guestAddress"))['telefono'];
          this.user.codigo_postal = JSON.parse(localStorage.getItem("guestAddress"))['codigo_postal_alt'];
          this.user.codigo_postal_alt = JSON.parse(localStorage.getItem("guestAddress"))['codigo_postal_alt'];
          this.user.direccion = JSON.parse(localStorage.getItem("guestAddress"))['direccion_alt'];
          this.user.provincia = JSON.parse(localStorage.getItem("guestAddress"))['provincia_alt'];
          this.user.municipio = JSON.parse(localStorage.getItem("guestAddress"))['municipio_alt'];

        } else {
          this.userService.getUserById(parseInt(localStorage.getItem('token'))).subscribe((data: any) => {
            this.direccion_alt = data[0]['direccion_alt'];
            this.provincia_alt = data[0]['provincia_alt'];
            this.municipio_alt = data[0]['municipio_alt'];
            this.codigo_postal_alt = data[0]['codigo_postal_alt'];
            this.user.name = data[0]['name'];
            this.user.direccion_alt = data[0]['direccion_alt'];
            this.user.provincia_alt = data[0]['provincia_alt'];
            this.user.municipio_alt = data[0]['municipio_alt'];
            this.user.email = data[0]['email'];
            this.user.telefono = data[0]['telefono'];
            this.user.codigo_postal = data[0]['codigo_postal'];
            this.user.codigo_postal_alt = data[0]['codigo_postal_alt'];
            this.user.direccion = data[0]['direccion'];
            this.user.provincia = data[0]['provincia'];
            this.user.municipio = data[0]['municipio'];

          }, (error: any) => {
            console.log(error);
          });
        }


      }
    });
  }
} 