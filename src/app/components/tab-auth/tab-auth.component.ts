import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

declare var microsoftTeams: any;

@Component({
  selector: 'app-tab-auth',
  templateUrl: './tab-auth.component.html',
  styleUrls: ['./tab-auth.component.scss']
})
export class TabAuthComponent implements OnInit {

  interval: any;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.accessToken.subscribe((accessToken: string) => {

      microsoftTeams.initialize();

      this.getTeamContext(accessToken);

     
    });
  }

  checkInitializedLibrary(): boolean {
    return typeof microsoftTeams.getContext === 'function';
  }

  getTeamContext(aceessToken) {

    microsoftTeams.getContext(function (context) {
      // Generate random state string and store it, so we can verify it in the callback
      let state = _guid(); // _guid() is a helper function in the sample
      localStorage.setItem("simple.state", state);
      localStorage.removeItem("simple.error");

      console.log(context);

      // Go to the Azure AD authorization endpoint
      let queryParams = {
        client_id: "33ba2f87-fb33-467b-94a6-0e6b68611d94",
        response_type: aceessToken,
        response_mode: "fragment",
        resource: "https://graph.microsoft.com/User.Read openid",
        redirect_uri: window.location.origin + "/#/tab-auth",
        nonce: _guid(),
        state: state,
        // The context object is populated by Teams; the upn attribute
        // is used as hinting information
        login_hint: context.upn,
      };
      let authorizeEndpoint = "https://login.microsoftonline.com/common/oauth2/authorize?" + toQueryString(queryParams, null);
      window.location.assign(authorizeEndpoint);

      function _guid(): string {
        return "random_string";
      }
    });

    function toQueryString(obj, prefix) {
      var str = [],
        p;
      for (p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p,
            v = obj[p];
          str.push((v !== null && typeof v === "object") ?
            toQueryString(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    }
  }

}
