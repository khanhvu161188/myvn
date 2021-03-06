export const environment = {
  production: true,
  port: 80,
  googleMapApiKey: 'AIzaSyACOLjTUMYHC2v02KnVKBEbX1-1oo4oTS0',
  apiUrl: 'https://stagingapi.thamhoa.vn',

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
  BuildVersion: 1
};
