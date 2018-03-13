import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private items: MenuItem[];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //this.router.navigate(['projects']);
  }

}
