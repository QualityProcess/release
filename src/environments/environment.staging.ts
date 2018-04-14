export const environment = {
  production: true,
  apiURL: "https://qualityprocess-staging.herokuapp.com/api/v1",
  adalAppId: "dad407b2-83d0-4e52-9b43-ba1940b9d9e9",
  adal5Config: {
    tenant: "common",
    clientId: "dad407b2-83d0-4e52-9b43-ba1940b9d9e9",
    postLogoutRedirectUri: window.location.origin + "/logout"
  },
  msTeamsConfig: {
    tenant: "common",
    clientId: "dad407b2-83d0-4e52-9b43-ba1940b9d9e9",
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: "",
    prompt: "admin_consent"
  }
};
