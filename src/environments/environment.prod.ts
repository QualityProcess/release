export const environment = {
  production: true,
  apiURL: "https://qualityprocess.herokuapp.com/api/v1",

  adal5Config: {
    tenant: "indoeng.com",
    clientId: "3e601a4c-6044-484c-a4cc-6009313d76ae",
    redirectUri: window.location.origin + "/tab-auth-silent",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: "",
    resource: "https://graph.microsoft.com/"
  },

  azureConfiguration: {
    tenant: "common",
    clientId: "3e601a4c-6044-484c-a4cc-6009313d76ae",
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    prompt: "admin_consent",
    extraQueryParameters: "",
    resource: "https://graph.microsoft.com/"
  },

  graphApi: "https://graph.microsoft.com/"

};
