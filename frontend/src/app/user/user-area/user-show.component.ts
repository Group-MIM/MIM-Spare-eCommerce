import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { RegionService } from '../../services/region.service';
import { CityService } from '../../services/city.service';
import { Observable } from 'rxjs/Rx';
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'ng-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent implements OnInit {
  user: User = {
    id: null,
    name: null,
    email: null,
    password: null,
    role: null,
  }
  regions: Observable<any>;
  cities: Observable<any>;
  countries: Observable<any>;

  public params: any;
  public id: any;

  userAreaForm: FormGroup;
  model: any = {};
  get f() { return this.userAreaForm.controls; }

  constructor( private countryService: CountryService, private activatedRoute: ActivatedRoute, fb: FormBuilder, private userService: UserService, private regionService: RegionService, private cityService: CityService) {
    this.userAreaForm = fb.group({
      'id_user_area': ['', [Validators.required]],
      'name_user_area': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'password_user_area': ['', [Validators.required, Validators.minLength(8)]],
      'verifypassword_user_area': ['', [Validators.required]],
      'provincia_user_area': ['', [Validators.pattern('[a-zA-Z ]*')]],
      'codigo_postal_user_area': ['', [Validators.pattern('^[0-9]{5}$')]],
      'municipio_user_area': ['', [Validators.pattern('[a-zA-Z ]*')]],
      'telefono_user_area': ['', [Validators.pattern('^[0-9]{9,12}$')]],
    }, {
        validator: this.MustMatch('password_user_area', 'verifypassword_user_area')
      });
  }

  ngOnInit() {
    this.params = this.activatedRoute.params
    .subscribe(params => this.id = params['id']);

    this.getUser(this.id);
    
    this.countries = this.countryService.getCountries();

  }

  changePais(){
    var id = $("#pais_user_area").children(":selected").attr("class");
    this.regions = this.regionService.getRegions(id);
    $(".first_option").remove();
}

  changeRegion(){
      var id = $("#provincia_user_area").children(":selected").attr("class");
      this.cities = this.cityService.getCities(id);
      $(".first_option").remove();
  }

  saveData() {
    this.user.id = this.id;
    this.user.email = String($('#email_user_area').val());
    this.user.name = String($('#name_user_area').val());
    this.user.direccion_alt = String($('#direccion_user_area').val());
    this.user.provincia_alt = String($('#provincia_user_area').val());
    this.user.pais_alt = String($('#pais_user_area').val());
    this.user.municipio_alt = String($('#municipio_user_area').val());
    this.user.codigo_postal_alt = String($('#codigo_postal_user_area').val());
    this.user.telefono = String($('#telefono_user_area').val());
    this.user.role = String($('#role_user_area').val());


    console.log(this.user);
    this.userService.editUser(this.user).subscribe((data: any) => {
      var x = document.getElementById("toast");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }, (error: any) => {
      var x = document.getElementById("toast_error");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    });


  }

  // custom validator to check that two fields match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  getUser(id: number) {
    this.userService.getUserById(id).subscribe((data: any) => {
      this.user.name = data[0]['name'];
      this.user.email = data[0]['email'];
      this.user.avatar = data[0]['avatar'];
      this.user.password = data[0]['password'];
      this.user.pais_alt = data[0]['pais_alt'];
      this.user.provincia_alt = data[0]['provincia_alt'];
      this.user.municipio_alt = data[0]['municipio_alt'];
      this.user.direccion_alt = data[0]['direccion_alt'];
      this.user.codigo_postal_alt = data[0]['codigo_postal_alt'];
      this.user.provincia = data[0]['provincia'];
      this.user.municipio = data[0]['municipio'];
      this.user.direccion = data[0]['direccion'];
      this.user.codigo_postal = data[0]['codigo_postal'];
      this.user.telefono = data[0]['telefono'];
      this.user.role = data[0]['role'];

    }, (error: any) => {
      console.log(error);
    });
  }

}
