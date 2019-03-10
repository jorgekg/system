import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private activedRoute: ActivatedRoute,
    private appStorageService: AppStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.appStorageService.getToken()) {
      this.router.navigate(['dashboard/login']);
    }
    const lobby = this.activedRoute.snapshot.data.home.lobby;
    if (!lobby.contents || lobby.contents.length === 0) {
      this.router.navigate(['dashboard/lobby/new']);
    }
  }

}
