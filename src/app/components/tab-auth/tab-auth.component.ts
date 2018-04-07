import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var microsoftTeams: any; 
declare var AuthenticationContext: any;

@Component({
  selector: 'app-tab-auth',
  templateUrl: './tab-auth.component.html',
  styleUrls: ['./tab-auth.component.scss']
})
export class TabAuthComponent implements OnInit {

  
  showLoginButton: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.loginWithMSTeams();
  }

  login() {
    this.authService.loginWithMSTeams();
  }

}
