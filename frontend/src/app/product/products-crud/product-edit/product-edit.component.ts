import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FileUploadService } from '../../../services/file-upload.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product';
import { AppGlobals } from '../../../../app/app.global';
import { CityService } from '../../../services/city.service';
import { RegionService } from '../../../services/region.service';
import { Observable } from 'rxjs/Rx';
import { CountryService } from '../../../services/country.service';
import { CategoryService } from '../../../services/category.service';


@Component({
  selector: 'ng-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers: [AppGlobals]
})
export class ProductEditComponent implements OnInit {
  public iva: any;
  public precio: any;
  categories: Observable<any>;
  regions: Observable<any>;
  cities: Observable<any>;
  countries: Observable<any>;

  public id: any;
  public params: any;
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
    tech_sheet: null
  };
  public formData: FormData;
  public imgUploaded: boolean = false;
  public sheetUploaded: boolean = false;


  constructor(private categoryService: CategoryService, private countryService: CountryService, private global: AppGlobals, private activatedRoute: ActivatedRoute, private productService: ProductService, private fileUploadService: FileUploadService, private regionService: RegionService, private cityService: CityService) { }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
    });
 
   this.countryService.getCountries().subscribe(data=>{
    this.countries = data;
  });

    this.params = this.activatedRoute.params
      .subscribe(params => this.id = params['id']);

    this.productService.getProduct(this.id).subscribe(
      data => {
        // console.log(data);
        this.product.description = data['description'];
        this.product.title = data['title'];
        this.product.imageLink = data['imageLink'];
        this.product.price = data['price'];
        this.product.madeIn = data['madeIn'];
        this.product.id = data['id'];
        this.product.price_sin_iva = data['price_sin_iva'];
        this.product.iva = data['iva'];
        this.product.quantity = data['quantity'];
        this.product.category = data['category'];
        this.product.medida = data['medida'];
        this.product.priority = data['priority'];
        this.product.codigo_articulo = data['codigo_articulo'];
        this.product.tech_sheet = data['tech_sheet'];

        var k = [];

        k = this.product.medida.split(" ");

        $("#medida1").val(k[0]);
        $("#medida2").val(k[1]);


      },
      error => console.log(<any>error));

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

  onSheetChange(event) {
    let elem = event.target;
    if (elem.files.length > 0) {
      this.formData = new FormData();
      this.formData.append('mysheet', elem.files[0]);
      this.sheetUploaded = true;

      if (parseInt(this.formData.get('mysheet')['size']) > 2000000) {
        var x = document.getElementById("toast-limit");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        this.formData = null;
        this.sheetUploaded = false;
      }
    }
  }


  calcularPrecio() {
    this.precio = $("#precio").val();
    this.iva = $("#iva").val();

    var iva_precio = (this.precio * this.iva) / 100;

    var precio_final = parseFloat(this.precio) + iva_precio;

    this.product.price = parseFloat(precio_final.toFixed(2));

    $("#precio_final").val(precio_final.toFixed(2));

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

    if (this.sheetUploaded) {
      this.fileUploadService.postFile(this.formData).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });

      this.product.tech_sheet = this.global.localimagepath + this.formData.get('mysheet')['name'];

    }


    this.product.medida = $("#medida1").val() + " " + $("#medida2").val();
  //  console.log(this.product);
    this.productService.updateProduct(this.product).subscribe((data: any) => {
      //console.log(data);
      var x = document.getElementById("toast");
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);

    }, (error: any) => {
      console.log(error);
      if (error.status == 200) {
        var x = document.getElementById("toast");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
      }

      if (error.status == 422) {
        var x = document.getElementById("toast-required");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
      }

    });

  }

}
