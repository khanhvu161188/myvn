// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  port: 4200,
  googleMapApiKey: 'AIzaSyACOLjTUMYHC2v02KnVKBEbX1-1oo4oTS0',
  apiUrl: 'https://stagingapi.thamhoa.vn',
  siteDomain: 'http://localhost:4200',

  // sso configurations
  stsAuthority: 'https://stagingid.thamhoa.vn/',
  clientId: 'portal_staging',
  // apiRoot: 'https://demo.identityserver.io/api/',
  redirect_uri: '/sso/signin_redirect_callback.html',
  // post_logout_redirect_uri: '/sso/signout_redirect_callback.html',
  response_type: 'code',
  scope: 'openid profile realtime_read realtime_write pod_read pod_write',
  popup_redirect_uri: '/sso/signin_callback.html',
  popup_post_logout_redirect_uri: '/sso/signout_callback.html',
  silent_redirect_uri: '/sso/signin_silent.html',
  automaticSilentRenew: false,
  validateSubOnSilentRenew: true,
  monitorAnonymousSession: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  revokeAccessTokenOnSignout: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
