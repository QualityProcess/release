import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

declare var microsoftTeams: any;

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
