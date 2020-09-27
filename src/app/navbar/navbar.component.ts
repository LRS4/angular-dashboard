import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userDetails: any;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        console.log(this.userDetails);
      },
      err => {
        console.log(err);
      }
    );
  }

  onLogout($event) {
    $event.preventDefault();
    localStorage.removeItem('token');
    this.router.navigate(['user/login']);
  }
}
