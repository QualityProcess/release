import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

declare var microsoftTeams: any;
declare var AuthenticationContext: any;

@Component({
  selector: 'app-team-config',
  templateUrl: './team-config.component.html',
  styleUrls: ['./team-config.component.scss']
})
export class TeamConfigComponent implements OnInit {

  selected = '';

  constructor(
    private renderer: Renderer2,
    private router: Router
) { }

  ngOnInit() {
    this.initMicrosoftTeams();

    let config = {
        clientId: "ee2ec70a-88b0-4a5d-8ae2-e924d65965f9",
        // redirectUri must be in the list of redirect URLs for the AAD app
        redirectUri: window.location.origin + this.selected,
        cacheLocation: "localStorage",
        navigateToLoginRequestUrl: false,
    };

    microsoftTeams.getContext();

    if (upn) {
        config.extraQueryParameters = "scope=openid+profile&login_hint=" + encodeURIComponent(upn);
    } else {
        config.extraQueryParameters = "scope=openid+profile";
    }

    let authContext = new AuthenticationContext(config); // from the ADAL.js library
    // See if there's a cached user and it matches the expected user
    let user = authContext.getCachedUser();
    if (user) {
        if (user.userName !== upn) {
            // User doesn't match, clear the cache
            authContext.clearCache();
        }
    }

    // Get the id token (which is the access token for resource = clientId)
    let token = authContext.getCachedToken(config.clientId);
    if (token) {
        showProfileInformation(token);
    } else {
        // No token, or token is expired
        authContext._renewIdToken(function (err, idToken) {
            if (err) {
                console.log("Renewal failed: " + err);
                // Failed to get the token silently; show the login button
                //showLoginButton();
                // You could attempt to launch the login popup here, but in browsers this could be blocked by
                // a popup blocker, in which case the login attempt will fail with the reason FailedToOpenWindow.
            } else {
                console.log(idToken);
            }
        });
    }

    if (authContext.isCallback(window.location.hash)) {
        authContext.handleWindowCallback(window.location.hash);
        if (authContext.getCachedUser()) {
            microsoftTeams.authentication.notifySuccess();
        } else {
            microsoftTeams.authentication.notifyFailure(authContext.getLoginError());
        }
      }



  }

 initMicrosoftTeams() {
    microsoftTeams.initialize();

    // Check the initial theme user chose and respect it
    microsoftTeams.getContext(function (context) {
      if (context && context.theme) {
        setTheme(context.theme);
      }
    });

    // Handle theme changes
    microsoftTeams.registerOnThemeChangeHandler(function (theme) {
      setTheme(theme);
    });

    // Save configuration changes
    microsoftTeams.settings.registerOnSaveHandler( saveEvent => {
      // Let the Microsoft Teams platform know what you want to load based on
      // what the user configured on this page
      microsoftTeams.settings.setSettings({
        contentUrl: this.createTabUrl(), // Mandatory parameter
        entityId: this.createTabUrl() // Mandatory parameter
      });

      // Tells Microsoft Teams platform that we are done saving our settings. Microsoft Teams waits
      // for the app to call this API before it dismisses the dialog. If the wait times out, you will
      // see an error indicating that the configuration settings could not be saved.
      saveEvent.notifySuccess();
    });

    // Set the desired theme
    function setTheme(theme) {
      if (theme) {
        // Possible values for theme: 'default', 'light', 'dark' and 'contrast'
        this.renderer.addClass(document.body, 'theme-' + (theme === 'default' ? 'light' : theme));
      }
    }

    microsoftTeams.settings.registerOnSaveHandler( (saveEvent) => {
      console.log('registerOnSaveHandler: ', saveEvent);
      this.router.navigate(['projects']);
    })

    

     
  }

  // Create the URL that Microsoft Teams will load in the tab. You can compose any URL even with query strings.
  createTabUrl() {
      return window.location.protocol + '//' + window.location.host + '/' + this.selected;
  }

  changed(){
    console.log(this.selected);
    microsoftTeams.settings.setValidityState(this.selected === 'first' || this.selected === 'second');
  }

}
