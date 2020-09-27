import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private router:Router) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res:any) => { 
        if (res.succeeded) {
          this.service.formModel.reset();
          this.router.navigate(['/sales']);
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.service.registerErrorMessage = "That username is already taken."
                break;
              case 'PasswordRequiresLower':
                this.service.registerErrorMessage = "The password cannot contain only numbers."
              default:
                this.service.registerErrorMessage = `Registration failed. Ensure all fields are completed and the password
                is a combination of letters and numbers.`
                break;
            }
          })
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}
