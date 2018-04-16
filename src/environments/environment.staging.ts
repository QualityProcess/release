export const environment = {
  production: true,
  apiURL: "https://qualityprocess-staging.herokuapp.com/api/v1",

  adal5Config: {
    tenant: "common",
    clientId: "aeb7cef4-f72f-4a7d-80e8-08611e0efcd2",
    redirectUri: window.location.origin + "/tab-auth-end",
    postLogoutRedirectUri: window.location.origin + "/logout"
  },
  azureConfiguration: {
    tenant: "common",
    clientId: "aeb7cef4-f72f-4a7d-80e8-08611e0efcd2",
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    prompt: "admin_consent",
    extraQueryParameters: "",
    resource: "https://graph.windows.net/"
  },

  graphApi: "https://graph.microsoft.com/v1.0"
};
