export const environment = {
  production: true,
  apiURL: "https://qualityprocess-staging.herokuapp.com/api/v1",

  adal5Config: {
    tenant: "common",
    clientId: "3e601a4c-6044-484c-a4cc-6009313d76ae",
    redirectUri: window.location.origin + "/tab-auth-silent",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: ""
  },
  azureConfiguration: {
    tenant: "common",
    clientId: "3e601a4c-6044-484c-a4cc-6009313d76ae",
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    prompt: "admin_consent",
    extraQueryParameters: "",
    resource: "https://graph.windows.net/"
  },

  graphApi: "https://graph.microsoft.com/v1.0"
};
