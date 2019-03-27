import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Permission, AppStorageService } from 'src/app/core/app-storage/app-storage.service';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.css']
})
export class NavbarLeftComponent implements OnInit {

  public permission: Permission = this.appStorageService.getPermission('lobby');

  constructor(
    private appStorageService: AppStorageService
  ) { }

  ngOnInit() {
  }

  public getModules() {
    return environment.url_modules;
  }

}
