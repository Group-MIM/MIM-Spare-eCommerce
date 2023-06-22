import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-signup-error',
  templateUrl: './signup-error.component.html',
  styleUrls: ['./signup-error.component.css']
})
export class SignupErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  intentarDeNuevo() {
    $("#signup-block").removeClass("d-none");
    $("#signup-error-block").addClass("d-none");
  }

}
