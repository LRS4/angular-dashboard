import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public service: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userIsAlreadyAuthenticated()) {  
      this.router.navigateByUrl('/sales');
    }
  }

  formModel = {
    UserName: '',
    Password: ''
  }

  userIsAlreadyAuthenticated() {
    return localStorage.getItem('token') != null;
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/sales');
      },
      err => {
        if (err.status == 400) {
          this.service.loginErrorMessage = "Incorrect username or password."
        } else {
          console.log(err);
        }
      }
    );
  }
}
