import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.css']
})
export class NavbarLeftComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public getModules() {
    return environment.url_modules;
  }

}
