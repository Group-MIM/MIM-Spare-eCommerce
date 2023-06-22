import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MailService } from '../services/mail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-send-instructions-recover-pass',
  templateUrl: './send-instructions-recover-pass.component.html',
  styleUrls: ['./send-instructions-recover-pass.component.css']
})
export class SendInstructionsRecoverPassComponent implements OnInit {
  ngOnInit() { }

  resetPassForm: FormGroup;

  constructor(private router: Router, private mailService: MailService, fb: FormBuilder) {
    this.resetPassForm = fb.group({
      'email_reset': ['', [Validators.required, Validators.email]],
    });
  }

  saveData() {
    //  console.log(this.resetPassForm.value);
    this.mailService.resetPass(this.resetPassForm.value).subscribe((data: any) => {
      $('#reset-pass-send-ok-block').removeClass('d-none');
      $('#formulario_reset').remove();
    }, (error: any) => {
      var x = document.getElementById("toast");
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    });

  }

}
