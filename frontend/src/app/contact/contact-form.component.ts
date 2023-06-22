import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from '../services/mail.service';

@Component({
  selector: 'ng-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private mailService: MailService, fb: FormBuilder) {
    this.contactForm = fb.group({
      'email_contact': ['', [Validators.required, Validators.email]],
      'telefono_contact': ['', [Validators.required, Validators.pattern('^[0-9]{9,12}$')]],
      'nombre_contact': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'mensaje_contact': ['', [Validators.required]],
    });
  }

  saveData() {
    console.log(this.contactForm.value);
    this.mailService.sendMail(this.contactForm.value).subscribe((data: any) => {
      console.log(data);
      alert("L'email s'ha enviat correctament. Ens posarem en contacte amb tu el més aviat possible.");

    }, (error: any) => {
      console.log(error);
      alert("Error al enviar l'email");

    });

  }

  ngOnInit() { }


}
