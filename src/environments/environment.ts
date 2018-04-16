// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiURL: "https://qualityprocess-development.herokuapp.com/api/v1",

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
