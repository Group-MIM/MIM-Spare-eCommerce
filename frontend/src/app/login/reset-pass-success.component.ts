import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-reset-pass-success',
  templateUrl: './reset-pass-success.component.html',
  styleUrls: ['./reset-pass-success.component.css']
})
export class ResetPassSuccessComponent implements OnInit {

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
