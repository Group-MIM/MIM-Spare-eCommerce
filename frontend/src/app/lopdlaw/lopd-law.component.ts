import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-lopd-law',
  templateUrl: './lopd-law.component.html',
  styleUrls: ['./lopd-law.component.css']
})
export class LopdLawComponent implements OnInit {
  public nombre_fiscal_lopd: string = "MIM Spare S.L.";
  public nombre_comercial_lopd: string = "MIM Spare";
  public telefono_lopd: string = "+34 97887392";
  public email_lopd: string = "info@mimspare.com";
  public sitio_web_lopd: string = "www.mimspare.com.com";
  public nif_lopd: string = "B67220350";
  public domicilio_lopd: string = "C/Serra 2, 08231 Ullastrell (Barcelona)";

  constructor() { }

  ngOnInit() {
  }

}
