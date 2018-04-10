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

    microsoftTeams.getContext(function (context) {
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

}
