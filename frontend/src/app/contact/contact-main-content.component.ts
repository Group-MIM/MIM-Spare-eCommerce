import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-contact-main-content',
  templateUrl: './contact-main-content.component.html',
  styleUrls: ['./contact-main-content.component.css']
})
export class ContactMainContentComponent implements OnInit {

  constructor() { }

  public telefono1: string = "(+34) 935 806 034";
  public telefono2: string = "(+34) 935 806 034";
  public email1: string = "info@mimspare.com";
  public email2: string = "info@mimspare.com";
  public direccion1: string = "Can Fatjó dels Aurons, 08193 Cerdanyola del Vallès (Barcelona)";
  public direccion2: string = "Can Fatjó dels Aurons, 08193 Cerdanyola del Vallès (Barcelona)";


  ngOnInit() {
  }

}
