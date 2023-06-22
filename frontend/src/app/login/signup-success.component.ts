import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrls: ['./signup-success.component.css']
})
export class SignupSuccessComponent implements OnInit {
  @Input() useradded: boolean; 

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
