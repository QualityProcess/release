// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiURL: "https://qualityprocess-development.herokuapp.com/api/v1",

  adal5Config: {
    tenant: "indoeng.com",
    clientId: "3e601a4c-6044-484c-a4cc-6009313d76ae",
    redirectUri: window.location.origin + "/tab-auth-silent",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    extraQueryParameters: "",
    resource: "https://graph.windows.net/"
  },
  azureConfiguration: {
    tenant: "indoeng.com",
    clientId: "3e601a4c-6044-484c-a4cc-6009313d76ae",
    redirectUri: window.location.origin + "/tab-auth-end",
    cacheLocation: "localStorage",
    navigateToLoginRequestUrl: false,
    prompt: "admin_consent",
    extraQueryParameters: "",
    resource: "https://graph.microsoft.com/"
  },

  graphApi: "https://graph.windows.net/"
};
