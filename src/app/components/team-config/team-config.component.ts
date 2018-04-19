// core
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// dialogs
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthDialog } from "../dialogs/auth-dialog";

// models
import { Project } from '../../models/project';

// services
import { AuthService } from '../../services/auth.service';

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
  selectedProject: any;
  projects: Project[];
  sortItems = [
    { sort: 'name', name: 'Name (A to Z)' },
    { sort: 'name-revers', name: 'Name (Z to A)' },
  ];

  constructor(
    private renderer: Renderer2,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private service: AuthService
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
    microsoftTeams.getContext( (context) => {
      

      if (context && context.theme) {
        setTheme(context.theme);
      }
    });

    microsoftTeams.registerOnThemeChangeHandler(function (theme) {
      setTheme(theme);
    });
     
    console.log("isMSTab: sdfds");

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
    return `${window.location.protocol}//${window.location.host}/projects/${this.selected}/matrix`;
  }

  getProjectName(): string {
    let project = this.projects.find((project) => { 
      return project.id === +this.selected;
    });

    //return typeof this.selected !== 'undefined' ? project.name : 'Projects';
    return 'QP';
  }

  changed(){
    console.log(this.selected);
    microsoftTeams.settings.setValidityState(true);
    //microsoftTeams.settings.setValidityState(this.selected === 'first' || this.selected === 'second');
  }

  sortData(name) {
    const data = this.projects.slice();

    this.projects = data.sort((a, b) => {
      let isAsc = 'asc';
      switch (name) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'name-revers': return compare(a.name, b.name, null);
        default: return 0;
      }
    });
  }

  chooseProject(project) {
    console.log(project);
    this.selected = project.id;
    microsoftTeams.settings.setValidityState(true);
  }

}

function compare(a: any, b: any, isAsc: any) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
