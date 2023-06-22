import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-reset-pass-send-ok',
  templateUrl: './reset-pass-send-ok.component.html',
  styleUrls: ['./reset-pass-send-ok.component.css']
})
export class ResetPassSendOkComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(route: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route );
    this.router.navigateByUrl(lang + route );
  }

}
