import { Component, OnInit } from '@angular/core';

import { environment } from './../../../environments/environment';

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

      let state = this._guid(); 
      localStorage.setItem("simple.state", state);
      localStorage.removeItem("simple.error");

      // Go to the Azure AD authorization endpoint
      let queryParams = {
        tenant: "common",
        client_id: environment.azureConfiguration.clientId,
        response_type: "code",
        response_mode: "fragment",
        scope: "user.read",
        resourceId: "a5f3ffb0-fce9-47a7-b1c9-79bcadd3b46d",
        redirect_uri: window.location.origin + "/tab-auth-end",
        nonce: this._guid(),
        state: state,
        //prompt: "admin_consent",
        login_hint: context.upn,
      };

      let authorizeEndpoint = "https://login.microsoftonline.com/common/oauth2/authorize?" + this.toQueryString(queryParams, null);

      window.location.assign(authorizeEndpoint);
    });
  }

  getHashParameters() {
    return window.location.hash;
  }

  _guid(): string {
    var text = "";
    var possible = "a5f3ffb0-fce9-47a7-b1c9-79bcadd3b46d";

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
