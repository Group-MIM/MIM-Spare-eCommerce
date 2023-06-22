import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      if (window.screen.width <= 991) {
        $(".politicas").removeClass('float-right');
        $(".politicas").addClass('float-left');
        $(".politicas").addClass('mt-2');
        $(".politicas").addClass('mb-2');

      } else {
        $(".politicas").removeClass('float-left');
        $(".politicas").addClass('float-right');
        $(".politicas").removeClass('mt-2');
        $(".politicas").removeClass('mb-2');

      }

      $('politicas a').click(function () {
        $(window).scrollTop(0);
      });
    });
  }

  onResize(event) {
    if (window.screen.width <= 991 || event.target.innerWidth <= 991) {
      $(".politicas").removeClass('float-right');
      $(".politicas").addClass('float-left');
      $(".politicas").addClass('mt-2');
      $(".politicas").addClass('mb-2');

    } else {
      $(".politicas").removeClass('float-left');
      $(".politicas").addClass('float-right');
      $(".politicas").removeClass('mt-2');
      $(".politicas").removeClass('mb-2');

    }
  }

  navigateTo(route: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route);
    this.router.navigateByUrl(lang + route);
  }

}
