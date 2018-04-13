export const environment = {
  production: true,
  apiURL: "https://qualityprocess.herokuapp.com/api/v1",
  adal5Config: {
    tenant: 'common',
    clientId: 'ee2ec70a-88b0-4a5d-8ae2-e924d65965f9',
    postLogoutRedirectUri: window.location.origin + '/logout'
  },
  msTeamsConfig: {
    tenant: 'common',
    clientId: 'ee2ec70a-88b0-4a5d-8ae2-e924d65965f9',
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: "",
    prompt: 'admin_consent'
  }
};
