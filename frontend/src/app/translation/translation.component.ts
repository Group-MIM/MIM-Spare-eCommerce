import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

  public activeLang = 'en';
  public idioma: any;
  public params: any;

  constructor(private router: Router,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.activeLang);
  }

  ngOnInit() {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];

    var url = ruta_arr.join("/");
    console.log(url);

    this.activeLang = lang;
    this.translate.use(lang);

    $("#idioma_select").click(function () {
      $(".flagscontainer").toggleClass("d-none");
    });

    $(".flag_translate").click(function () {
      $(".flagscontainer").toggleClass("d-none");

    });
  }

  public cambiarLenguaje(lang) {

    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    ruta_arr[1] = lang;

    var url = ruta_arr.join("/");
    console.log(url);

    this.activeLang = lang;
    this.translate.use(lang);

    window.location.replace(url);
  }
}