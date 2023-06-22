import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ng-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  resetPassForm: FormGroup;
  model: any = {};
  code: any;
  user: User = {
    id: null,
    name: null,
    email: null,
    password: null

  }
  get f() { return this.resetPassForm.controls; }

  constructor(private router: Router, private route: ActivatedRoute, fb: FormBuilder, private userService: UserService) {

    this.code = this.route.snapshot.paramMap.get("code");
    this.userService.getUserByToken(this.code).subscribe((data: any) => {
      if(data == null){
        this.router.navigate(['/ca/home']);
      }else{
        this.user = data;

      }
    }, (error: any) => {
      this.router.navigate(['/ca/home']);
      console.log(error);
    });


    this.resetPassForm = fb.group({
      'password_new': ['', [Validators.required, Validators.minLength(8)]],
      'verify_new_password': ['', [Validators.required]],
    }, {
        validator: this.MustMatch('password_new', 'verify_new_password')
      });

  }

  ngOnInit() {
  }

  saveData() {
    this.user.password = this.resetPassForm.value['password_new'];

    console.log(this.user);
    this.userService.editUser(this.user).subscribe((data: any) => {
      $('#reset-pass-success-block').removeClass('d-none');
      $('#formulario_reset').remove();
    }, (error: any) => {
      console.log(error);
    });
  }

  // custom validator to check that two fields match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
