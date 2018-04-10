import { Component, OnInit } from '@angular/core';

declare var microsoftTeams: any;
declare var AuthenticationContext: any;

@Component({
  selector: 'app-tab-auth-modal',
  templateUrl: './tab-auth-modal.component.html',
  styleUrls: ['./tab-auth-modal.component.scss']
})
export class TabAuthModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    microsoftTeams.initialize();

    microsoftTeams.getContext((context) => {
      // Generate random state string and store it, so we can verify it in the callback
      let state = this._guid(); // _guid() is a helper function in the sample
      localStorage.setItem("simple.state", state);
      localStorage.removeItem("simple.error");
      // Go to the Azure AD authorization endpoint
      let queryParams = {
        client_id: "a5f3ffb0-fce9-47a7-b1c9-79bcadd3b46d",
        response_type: "id_token token",
        response_mode: "fragment",
        resource: "https://graph.microsoft.com/User.Read openid",
        redirect_uri: window.location.origin + "/projects",
        nonce: this._guid(),
        state: state,
        // The context object is populated by Teams; the upn attribute
        // is used as hinting information
        login_hint: context.upn,
      };
      let authorizeEndpoint = "https://login.microsoftonline.com/common/oauth2/authorize?" + this.toQueryString(queryParams, null);
      window.location.assign(authorizeEndpoint);


      let hashParams = this.getHashParameters();
      if (hashParams["error"]) {
        // Authentication/authorization failed
        microsoftTeams.authentication.notifyFailure(hashParams["error"]);
      } else if (hashParams["access_token"]) {
        // Get the stored state parameter and compare with incoming state
        // This validates that the data is coming from Azure AD
        let expectedState = localStorage.getItem("simple.state");
        if (expectedState !== hashParams["state"]) {
          // State does not match, report error
          microsoftTeams.authentication.notifyFailure("StateDoesNotMatch");
        } else {
          // Success: return token information to the tab
          microsoftTeams.authentication.notifySuccess({
            idToken: hashParams["id_token"],
            accessToken: hashParams["access_token"],
            tokenType: hashParams["token_type"],
            expiresIn: hashParams["expires_in"]
          })
        }
      } else {
        // Unexpected condition: hash does not contain error or access_token parameter
        microsoftTeams.authentication.notifyFailure("UnexpectedFailure");
      }


    });
  }

  _guid(): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  toQueryString(obj, prefix) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          this.toQueryString(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }

  getHashParameters() {
    var hash = window.location.hash.substring(1);
    var params = {}
    hash.split('&').map(hk => {
      let temp = hk.split('=');
      params[temp[0]] = temp[1]
    });
    console.log(params);
  }

}
