import {isPlatformBrowser} from '@angular/common';
import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthService, User} from '../auth/services/authService';

@Component({
  selector: 'app-env',
  templateUrl: './env.component.html',
})
export class EnvComponent implements OnInit {
  public isBrowser = isPlatformBrowser(this.platformId);
  public variables = new Map<string, string>();
  public user: User = null;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private authService: AuthService) {
    this.user = authService.user;
  }

  ngOnInit() {
    Object.keys(environment).forEach((k) => {
      this.variables.set(k, environment[k]);
    });
  }

}
