import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { AppGlobals } from '../../../../app/app.global';
import { RegionService } from '../../../services/region.service';
import { CityService } from '../../../services/city.service';
import { FileUploadService } from '../../../services/file-upload.service';
import { Observable } from 'rxjs/Rx';
import { CountryService } from '../../../services/country.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'ng-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [AppGlobals]
})
export class ProductCreateComponent implements OnInit {

  public iva: any;
  public precio: any;
  regions: Observable<any>;
  cities: Observable<any>;
  countries: Observable<any>;
  categories: Observable<any>;
  public product: Product = {
    category: null,
    description: null,
    id: null,
    imageLink: null,
    madeIn: null,
    price: null,
    quantity: null,
    title: null,
    iva: null,
    price_sin_iva: null,
    priceAmount: null,
    medida: null,
    priority: null,
    codigo_articulo: null,
    provider: null,
    tech_sheet: null, 
  };
  public formData: FormData;
  public imgUploaded: boolean = false;


  constructor(private categoryService: CategoryService, private countryService: CountryService, private global: AppGlobals, private productService: ProductService, private fileUploadService: FileUploadService, private regionService: RegionService, private cityService: CityService) { }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
    });
 
   this.countryService.getCountries().subscribe(data=>{
    this.countries = data;
  });

    this.product.description = "";
    this.product.title = "";
    this.product.imageLink = "";
    this.product.iva = 0;
    this.product.price_sin_iva = 0.00;
    this.product.price = 0.00;
    this.product.madeIn = "";
    this.product.id = 0;
    this.product.quantity = 0;
    this.product.category = "";
    this.product.medida = "";
    this.product.priority = 0;
    this.product.codigo_articulo = "";
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

  onFileChange(event) {
    let elem = event.target;
    if (elem.files.length > 0) {
      this.formData = new FormData();
      this.formData.append('myfile', elem.files[0]);
      this.imgUploaded = true;

      if (parseInt(this.formData.get('myfile')['size']) > 2000000) {
        var x = document.getElementById("toast-limit");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        this.formData = null;
        this.imgUploaded = false;
      }
    }
  }

  saveChanges() {

    if (this.imgUploaded) {
      this.fileUploadService.postFile(this.formData).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });

      this.product.imageLink = this.global.localimagepath + this.formData.get('myfile')['name'];

    }

    this.product.medida = $("#medida1").val() + " " + $("#medida2").val();

    this.productService.addProduct(this.product).subscribe((data: any) => {
      console.log(data);
      var x = document.getElementById("toast");
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);

    }, (error: any) => {
      console.log(error);
      if (error.status == 201) {
        var x = document.getElementById("toast");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
      }

      if (error.status == 422) {
        var x = document.getElementById("toast-required");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
      }

      if (error.status == 500) {
        var x = document.getElementById("toast-server");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
      }

    });

  }

  calcularPrecio() {
    this.precio = $("#precio").val();
    this.iva = $("#iva").val();

    var iva_precio = (this.precio * this.iva) / 100;

    var precio_final = parseFloat(this.precio) + iva_precio;

    this.product.price = parseFloat(precio_final.toFixed(2));

    $("#precio_final").val(precio_final.toFixed(2));

  }
}
