import { Component, OnInit, Input } from '@angular/core';
import { MailService } from '../services/mail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-signup-incomplete',
  templateUrl: './signup-incomplete.component.html',
  styleUrls: ['./signup-incomplete.component.css']
})
export class SignupIncompleteComponent implements OnInit {

  @Input() emailUser;
  constructor(private router: Router, private mailService: MailService) { }

  ngOnInit() {
  }

  enviarMail() {
    this.mailService.verificarUsuario(this.emailUser).subscribe((data: any) => {
      if (typeof data[0] !== 'undefined' && data[0] == 201) {
        var x = document.getElementById("toast_incomplete");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        setTimeout(function () { location.replace('/'); }, 3000);

      } else {
        this.router.navigate(['/ca/home']);
      }

    }, (error: any) => {
      console.log(error);
    });
  }
}


