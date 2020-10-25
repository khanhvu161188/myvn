import {isPlatformBrowser} from '@angular/common';
import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService, User} from '../auth/services/authService';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public isBrowser = isPlatformBrowser(this.platformId);

  public get user() {
    return this.authService.user;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: any, private authService: AuthService, private http: HttpClient) {

  }

  ngOnInit() {
    this.authService.bindUserInfo();
    this.authService.authChange.subscribe(user => {
      console.log('authChange', user);
    });
  }

  onLogin() {
    this.authService.login()
      .catch(err => {
        console.error('Login Failed!', err);
      });
  }

  onLogout() {
    this.authService.logout()
      .then(() => console.log('Logged out'))
      .catch(err => console.error('Logout Failed!', err));
  }

}
