import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RegionService } from '../../services/region.service';
import { CityService } from '../../services/city.service';
import { Observable } from 'rxjs/Rx';
import { CountryService } from '../../services/country.service';
import { Product } from '../../models/product';
import {Router} from '@angular/router';

@Component({
  selector: 'ng-guest-address',
  templateUrl: './guest-address.component.html',
  styleUrls: ['./guest-address.component.css']
})
export class GuestAddressComponent implements OnInit {
  public precioTotal: number = 0.00;
  public products: Array<Product> = JSON.parse(localStorage.getItem("arrayProductosCarro"));
  public lang: any;
  user: User = {
    id: null,
    name: null,
    email: null
  }
  regions: Observable<any>;
  cities: Observable<any>;
  countries: Observable<any>;

  userAreaForm: FormGroup;
  model: any = {};
  get f() { return this.userAreaForm.controls; }

  constructor(private router: Router, private countryService: CountryService, fb: FormBuilder, private userService: UserService, private regionService: RegionService, private cityService: CityService) {
    this.userAreaForm = fb.group({
      'id_user_area': ['', [Validators.required]],
      'name_user_area': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'provincia_user_area': ['', [Validators.pattern('[a-zA-Z ]*')]],
      'codigo_postal_user_area': ['', [Validators.pattern('^[0-9]{5}$')]],
      'municipio_user_area': ['', [Validators.pattern('[a-zA-Z ]*')]],
      'telefono_user_area': ['', [Validators.pattern('^[0-9]{9,12}$')]],
    });
  }

  ngOnInit() {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    this.lang = ruta_arr[1];

    var precioCarroNavbar = document.getElementById('preciocarro');
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');


    if (this.products == null || this.products === undefined || this.products.length == 0) {
      precioCarroNavbar.innerHTML = '0.00';
      precioCarroNavbarMob.innerHTML = '0.00';

    }

    this.precioTotal = this.sumarPrecioCarro();
    precioCarroNavbar.innerHTML = String(this.precioTotal.toFixed(2));
    precioCarroNavbarMob.innerHTML = String(this.precioTotal.toFixed(2));
    this.countries = this.countryService.getCountries();
  }

  changePais() {
    var id = $("#pais_user_area").children(":selected").attr("class");
    this.regions = this.regionService.getRegions(id);
    $("#first_option").remove();
  }

  changeRegion() {
    var id = $("#provincia_user_area").children(":selected").attr("class");
    this.cities = this.cityService.getCities(id);
    $("#first_option").remove();
  }

  saveData() {

    this.user.email = String($('#email_user_area').val());
    this.user.name = String($('#name_user_area').val());
    this.user.direccion_alt = String($('#direccion_user_area').val());
    this.user.provincia_alt = String($('#provincia_user_area').val());
    this.user.pais_alt = String($('#pais_user_area').val());
    this.user.municipio_alt = String($('#municipio_user_area').val());
    this.user.codigo_postal_alt = String($('#codigo_postal_user_area').val());
    this.user.telefono = String($('#telefono_user_area').val());

    console.log(this.user);

    localStorage.setItem("guestAddress", JSON.stringify(this.user));

    this.router.navigateByUrl(this.lang + '/cart');


  }

  sumarPrecioCarro(): number {
    this.precioTotal = 0.00;
    for (let index = 0; index < this.products.length; index++) {
      const element = this.products[index];

      if (element.priceAmount <= 0.00) {
        element.priceAmount = 0.00;
      }

      this.precioTotal = this.precioTotal + element.priceAmount;
    }

    var precioCarroNavbar = document.getElementById('preciocarro');
    var precioCarroNavbarMob = document.getElementById('preciocarro-mob');

    precioCarroNavbar.innerHTML = String(this.precioTotal.toFixed(2))
    precioCarroNavbarMob.innerHTML = String(this.precioTotal.toFixed(2))

    localStorage.setItem("precioCarro", JSON.stringify(this.precioTotal.toFixed(2)));
    return parseFloat(this.precioTotal.toFixed(2));

  }



}
