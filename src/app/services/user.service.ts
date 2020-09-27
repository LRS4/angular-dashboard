import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }
  readonly BaseURI = 'https://localhost:44364/api/'

  registerErrorMessage = null;
  loginErrorMessage = null;

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FirstName: [''],
    LastName: [''],
    Passwords: this.fb.group({
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    }, { validator: this.comparePasswords })
  });

  comparePasswords(fb:FormGroup) {
    let confirmPassword = fb.get('ConfirmPassword');
    if (confirmPassword.errors == null || 'passwordMismatch' in confirmPassword.errors) {
      if (fb.get('Password').value != confirmPassword.value) {
        confirmPassword.setErrors({
          passwordMismatch: true
        });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI.concat('user/register'), body);
  }

  login(formData) {
    return this.http.post(this.BaseURI.concat('user/login'), formData);
  }
}