import {User, UserManager} from 'oidc-client';
import {environment} from 'src/environments/environment';

import {EventEmitter, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {EnvBrowserService, MY_API_URL, MY_SITE_DOMAIN} from '../../services/Env.service';

export {User};

@Injectable()
export class AuthService {
  private userManager: UserManager;
  private _user: User;
  private isBrowser = isPlatformBrowser(this.platformId);
  private apiUrl: string;
  private siteDomain: string;

  public authChange = new EventEmitter();

  public get user(): User {
    return this._user;
  }

  public set user(value: User) {
    this._user = value;
    this.authChange.emit(value);
  }

  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient, private envService: EnvBrowserService) {
    this.apiUrl = envService.get(MY_API_URL);
    this.siteDomain = envService.get(MY_SITE_DOMAIN);

    const settings = {
      authority: environment.stsAuthority,
      client_id: environment.clientId,
      // redirect_uri: this.siteDomain + environment.redirect_uri,
      silent_redirect_uri: this.siteDomain + environment.silent_redirect_uri,
      // post_logout_redirect_uri: environment.apiUrl,
      response_type: environment.response_type,
      scope: environment.scope,
      popup_redirect_uri: this.siteDomain + environment.popup_redirect_uri,
      popup_post_logout_redirect_uri: this.siteDomain + environment.popup_post_logout_redirect_uri,
      automaticSilentRenew: environment.automaticSilentRenew,
      validateSubOnSilentRenew: environment.validateSubOnSilentRenew,
      monitorAnonymousSession: environment.monitorAnonymousSession,
      filterProtocolClaims: environment.filterProtocolClaims,
      loadUserInfo: environment.loadUserInfo,
      revokeAccessTokenOnSignout: environment.revokeAccessTokenOnSignout,
    };
    if (this.isBrowser) {
      this.userManager = new UserManager(settings);

      this.userManager.events.addUserLoaded((user) => {
        console.log('user loaded', user);
        this.user = user;
        this.bindUserInfo();
      });

      this.userManager.events.addAccessTokenExpired(() => {
        console.log('token expired');
      });

      this.userManager.events.addSilentRenewError((e) => {
        console.log('silent renew error', e.message);
      });
    }
  }

  public getUser(): Promise<User> {
    if (this.isBrowser) {
      return this.userManager.getUser();
    } else {
      return Promise.resolve(null);
    }
  }

  public login(): Promise<User> {
    return this.userManager.signinPopup();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutPopup().then(() => {
      this.user = null;
    });
  }

  /**
   * Load user info from authenticated oid user
   */
  public bindUserInfo(): any {
    if (this.isBrowser) {
      this.getUser()
        .then(user => {
          this.user = user;
          // if (user) {
          //   console.log('authenticated user', user);
          //   console.log('authenticated user token', user.access_token);
          //   // this.http.get<any>(this.apiUrl + '/pod/v1/misc/auth').subscribe((info) => {
          //   //   console.log('user info', info);
          //   // }, error => {
          //   //   console.error('Bind user failed!', error);
          //   // });
          // }
        });
    }
  }
}
