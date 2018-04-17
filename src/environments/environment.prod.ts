export const environment = {
  production: true,
  apiURL: "https://qualityprocess.herokuapp.com/api/v1",

  adal5Config: {

    clientId: "ee2ec70a-88b0-4a5d-8ae2-e924d65965f9",
    redirectUri: window.location.origin + "/tab-auth-silent",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: "",
  },

  azureConfiguration: {
    tenant: "common",
    clientId: "ee2ec70a-88b0-4a5d-8ae2-e924d65965f9",
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    prompt: "admin_consent",
    extraQueryParameters: "",
    resource: "https://graph.windows.net/"
  },

  graphApi: "https://graph.microsoft.com/v1.0"

};
