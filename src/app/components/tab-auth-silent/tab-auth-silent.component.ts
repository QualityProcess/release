import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// services
import { AuthService } from './../../services/auth.service';

// environment
import { environment } from './../../../environments/environment';

declare var microsoftTeams: any;
declare var AuthenticationContext: any;

@Component({
  selector: 'app-tab-auth-silent',
  templateUrl: './tab-auth-silent.component.html',
  styleUrls: ['./tab-auth-silent.component.scss']
})
export class TabAuthSilentComponent implements OnInit {
  private authContext: any;

  constructor(
    private router: Router,
    private authSerive: AuthService
  ) { }

  ngOnInit() {
    this.adalInit();
  }

  adalInit() {
    microsoftTeams.initialize();

    microsoftTeams.getContext((context) => {
      // redirect to MS tab 

      console.log("Silent: ", this.authSerive.isSilentAuthentication);

      this.authContext = new AuthenticationContext(environment.adal5Config);

      console.log(window.location.hash);

      if (this.authContext.isCallback(window.location.hash)) {
        this.authContext.handleWindowCallback(window.location.hash);
        if (this.authContext.getCachedUser()) {

          console.log("Silent success: ", this.authContext.getCachedToken(environment.adal5Config.clientId));
          microsoftTeams.authentication.notifySuccess(this.authContext.getCachedToken(environment.adal5Config.clientId));
          this.router.navigate([this.authSerive.parseUrl(context.entityId, "pathname")]);
        } else {
          console.log("Silent fail: ", this.authContext.getCachedToken(environment.adal5Config.clientId));
          microsoftTeams.authentication.notifyFailure(this.authContext.getLoginError());
        }
      }
    });
  }
}
