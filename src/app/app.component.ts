import { Component, OnInit } from '@angular/core';

// services
import { UserService } from './services/user.service';

// adal
import { Adal5HTTPService, Adal5Service } from 'adal-angular5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loaded: boolean = false;

  constructor(
    //private adal5Service: Adal5Service,
    private userService: UserService
  ) {
    
  }

  ngOnInit() {
    this.loaded = true;
  }
}
