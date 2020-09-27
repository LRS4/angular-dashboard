import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  constructor(public service: UserService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      /**
       * Subscribing to route/url changes allows components to reload
       * data. The main fix for current user information not updating
       * was to use a shared service - the user service
       * @see http://marclloyd.co.uk/angular/reloading-components-when-route-parameters-change-in-angular
       */
      this.activatedRoute.paramMap.subscribe(params => {
        this.ngOnInit();
      })
   }

  ngOnInit(): void {
    this.getUserProfileData();
  }

  getUserProfileData() {
    this.service.getUserProfile().subscribe(
      res => {
        this.service.userDetails = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  onLogout($event) {
    $event.preventDefault();
    this.service.userDetails = null;
    localStorage.removeItem('token');
    this.router.navigate(['user/login']);
  }
}
