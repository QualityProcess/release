import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// services
import { AuthService } from './../../services/auth.service';
import { BreadCrumbsService } from './../../services/breadcrumbs.service';

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
    private authSerive: AuthService,
    private breadcrumbsService: BreadCrumbsService
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

          this.authContext.acquireToken(environment.graphApi, function (error, token) {
            if (error || !token) {
              console.log("ADAL error occurred: " + error);

              //throw new Error("Get graph token fail!");
            }
            else {
              console.log("Graph token: ", token);
          
            }
          });

          console.log("Silent success: ", this.authContext.getCachedToken(environment.adal5Config.clientId));
          //microsoftTeams.authentication.notifySuccess(this.authContext.getCachedToken(environment.adal5Config.clientId));

          console.log("redirect to: ", this.authSerive.parseUrl(context.entityId, "pathname"));
          if (context.entityId) this.breadcrumbsService.currentProjectUrl = this.authSerive.parseUrl(context.entityId, "pathname");
          console.log("this.breadcrumbsService.currentProjectUrl: ", this.breadcrumbsService.currentProjectUrl);

          this.router.navigate([this.authSerive.parseUrl(context.entityId, "pathname")]);
        } else {
          console.log("Silent fail: ", this.authContext.getCachedToken(environment.adal5Config.clientId));
          microsoftTeams.authentication.notifyFailure(this.authContext.getLoginError());
          console.log("redirect to login");
          this.router.navigate(['login']);
        }
      }
    });
  }
}
