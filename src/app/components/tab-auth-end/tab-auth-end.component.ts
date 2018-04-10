import { Component, OnInit } from '@angular/core';

declare var microsoftTeams: any;
declare var AuthenticationContext: any;

@Component({
  selector: 'app-tab-auth-end',
  templateUrl: './tab-auth-end.component.html',
  styleUrls: ['./tab-auth-end.component.scss']
})
export class TabAuthEndComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    console.log("TAB_AUTH_END");
    //microsoftTeams.initialize();

    // Split the key-value pairs passed from Azure AD
    // getHashParameters is a helper function that parses the arguments sent
    // to the callback URL by Azure AD after the authorization call
    let hashParams = this.getHashParameters();
    console.log(hashParams);
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
      microsoftTeams.authentication.notifyFailure("UnexpectedFailure tab auth end");
    }
  }

  getHashParameters() {
    var hash = window.location.hash.substring(1);
    var params = {}
    hash.split('&').map(hk => {
      let temp = hk.split('=');
      params[temp[0]] = temp[1]
    });
    return params;
  }

}
