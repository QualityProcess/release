export const environment = {
  production: true,
  apiURL: "https://qualityprocess-staging.herokuapp.com/api/v1",

  adal5Config: {
    tenant: "common",
    clientId: "dad407b2-83d0-4e52-9b43-ba1940b9d9e9",
    postLogoutRedirectUri: window.location.origin + "/logout"
  },
  azureConfiguration: {
    tenant: "common",
    clientId: "dad407b2-83d0-4e52-9b43-ba1940b9d9e9",
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    prompt: "admin_consent",
    extraQueryParameters: "",
    resource: "https://graph.windows.net/"
  },

  graphApi: "https://graph.microsoft.com/v1.0"
};
