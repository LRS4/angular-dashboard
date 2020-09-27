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

  setUserProfileData() {
    this.service.getUserProfile().subscribe(
      res => {
        this.service.userDetails = res;
        console.log(this.service.userDetails);
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.setUserProfileData();
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
