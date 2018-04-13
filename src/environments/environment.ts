// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiURL: "https://qualityprocess-development.herokuapp.com/api/v1",
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
    prompt: 'admin_consent',
    extraQueryParameters: "",
  }
};
