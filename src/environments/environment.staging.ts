export const environment = {
  production: true,
  apiURL: "https://qualityprocess-staging.herokuapp.com/api/v1",
  adal5Config: {
    tenant: 'common',
    clientId: '60531b38-e543-4327-8d7f-67dd3b8f8127',
    postLogoutRedirectUri: window.location.origin + '/logout'
  },
  msTeamsConfig: {
    tenant: 'common',
    clientId: '60531b38-e543-4327-8d7f-67dd3b8f8127',
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: "",
    prompt: 'admin_consent'
  }
};
