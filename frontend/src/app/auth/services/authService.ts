import {User, UserManager} from 'oidc-client';
import {environment} from 'src/environments/environment';

import {EventEmitter, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {EnvBrowserService, MY_API_URL} from '../../services/Env.service';

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
    if (this.isBrowser) {
      this.siteDomain = window.location.protocol + '//' + window.location.host;

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
            // console.log('authenticated user', user);
            // console.log('authenticated user token', user.access_token);
            this.http.get<HttpResponse<string>>(this.apiUrl + '/pod/v1/misc/auth', {
              headers: {
                Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwQUQ5NTE4N0Y4NEFEN0QxNkQ5NjUyMUFBQ0Y5MzVCMjgxMjQ2MzYiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJRSzJWR0gtRXJYMFcyV1VocXMtVFd5Z1NSalkifQ.eyJuYmYiOjE2MDM2NzUyODgsImV4cCI6MTYwNjI2NzI4OCwiaXNzIjoiaHR0cHM6Ly9zdGFnaW5naWQudGhhbWhvYS52biIsImF1ZCI6WyJwb2QiLCJyZWFsdGltZSJdLCJjbGllbnRfaWQiOiJwb3J0YWxfc3RhZ2luZyIsInN1YiI6IjE5ZjdhNGQ3LTViMDUtNGRjOC1hZDQwLTdhYzg4ZjhkZGQzMCIsImF1dGhfdGltZSI6MTYwMzY3NTI4MywiaWRwIjoiRmFjZWJvb2siLCJlbWFpbCI6ImRhb21pbmhzYW5ndm5AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxOWY3YTRkNy01YjA1LTRkYzgtYWQ0MC03YWM4OGY4ZGRkMzAiLCJmaXJzdG5hbWUiOiJTYW5nIiwibGFzdG5hbWUiOiJEYW8iLCJzY29wZSI6WyJwcm9maWxlIiwib3BlbmlkIiwicG9kX3dyaXRlIiwicG9kX3JlYWQiLCJyZWFsdGltZV93cml0ZSIsInJlYWx0aW1lX3JlYWQiXSwiYW1yIjpbImV4dGVybmFsIl19.EOzzoY3niwgmw_711TGcL4GguXEoZ0lMb90djPZwYu9CFgGVTU-sDM8cnGr1q9heENalJvP8OnBBtSepxdpHM8msFUM0A0cQ0u69CONuKxdrTUrNBaDj4OYK3iH_xVmvnLcn722y_5VOFJ0ceHUx7-N3wR_135FOgsr1iDAnn8pjaeA2H3bqvU0BYv6Fs-yiae6znT7NaIXTpiJ7iH99FRNu62fTukrpnCyu8Eih52Ay8dOu2YQzTWloS7lGi9bRRCmSGh9i04-Uh5YpuS1tiUOlK5ASdwC7Cc8P8o69FaZhg3moVxmNovLQFF1c3N0TKItAkpupaoYcjrRdkMVDNA"
              },
            }).subscribe((info) => {
              console.log('user info', info);
            }, error => {
              console.error('Bind user failed!', error);
            });
        });
    }
  }
}
