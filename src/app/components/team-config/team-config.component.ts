// core
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// dialogs
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthDialog } from "../dialogs/auth-dialog";

// models
import { Project } from '../../models/project';

// global veribles
declare var microsoftTeams: any;
declare var AuthenticationContext: any;

@Component({
  selector: 'app-team-config',
  templateUrl: './team-config.component.html',
  styleUrls: ['./team-config.component.scss']
})
export class TeamConfigComponent implements OnInit {

  selected = '';
  projects: Project[];

  constructor(
    private renderer: Renderer2,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.projects = this.route.snapshot.data.projectsData;
    console.log(this.projects);
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

    microsoftTeams.registerOnThemeChangeHandler(function (theme) {
      setTheme(theme);
    });

    // Save configuration changes
    microsoftTeams.settings.registerOnSaveHandler( saveEvent => {

      console.log(this.createTabUrl());
      console.log(this.getProjectName());


      microsoftTeams.settings.setSettings({
        contentUrl: this.createTabUrl(),
        entityId: this.createTabUrl(),
        suggestedDisplayName: this.getProjectName()
      });

      saveEvent.notifySuccess();
    });

    function setTheme(theme) {
      if (theme) {
        // Possible values for theme: 'default', 'light', 'dark' and 'contrast'
        this.renderer.addClass(document.body, 'theme-' + (theme === 'default' ? 'light' : theme));
      }
    }

    
     
  }

  createTabUrl() {
    return typeof this.selected !== 'undefined' ? `${window.location.protocol}//${window.location.host}/projects/${this.selected}/matrix` : `${window.location.protocol}//${window.location.host}/projects`;
  }

  getProjectName(): string {
    let project = this.projects.find((project) => { 
      return project.id === +this.selected;
    });

    return typeof this.selected !== 'undefined' ? project.name : 'Projects';
  }

  changed(){
    console.log(this.selected);
    microsoftTeams.settings.setValidityState(true);
    //microsoftTeams.settings.setValidityState(this.selected === 'first' || this.selected === 'second');
  }

}
