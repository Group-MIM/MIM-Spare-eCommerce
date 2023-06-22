import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ng-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  model: any = {};
  user: User = {
    id: null,
    name: null,
    email: null,
    password: null

  }
  get f() { return this.signupForm.controls; }

  constructor(fb: FormBuilder, private userService: UserService) {
    this.signupForm = fb.group({
      'email_signup': ['', [Validators.required, Validators.email]],
      'name_signup': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'password_signup': ['', [Validators.required, Validators.minLength(8)]],
      'verifypassword': ['', [Validators.required]],
    }, {
        validator: this.MustMatch('password_signup', 'verifypassword')
      });

  }

  ngOnInit() {
  }

  saveData() {
    this.user.email = this.signupForm.value['email_signup'];
    this.user.name = this.signupForm.value['name_signup'];
    this.user.password = this.signupForm.value['password_signup'];

    this.userService.addUser(this.user).subscribe((data: any) => {
      $("#signup-success-block").removeClass("d-none");
      $("#signup-block").addClass("d-none");
      //console.log(data);
    }, (error: any) => {
      $("#signup-error-block").removeClass("d-none");
      $("#signup-block").addClass("d-none");
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
