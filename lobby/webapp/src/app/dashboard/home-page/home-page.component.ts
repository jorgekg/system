import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public cardReportScheduling;
  public cardReportCanceled;

  constructor(
    private activedRoute: ActivatedRoute,
    private appStorageService: AppStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.activedRoute.snapshot.data.home.cardReport) {
      this.cardReportScheduling = this.activedRoute.snapshot.data.home.cardReport.contents[0];
      this.cardReportCanceled = this.activedRoute.snapshot.data.home.cardReport.contents.length > 1
        ? this.activedRoute.snapshot.data.home.cardReport.contents[1]
        : null;
    }
    if (!this.appStorageService.getToken()) {
      this.router.navigate(['dashboard/login']);
    }
    const lobby = this.activedRoute.snapshot.data.home.lobby;
    if (!lobby.contents || lobby.contents.length === 0) {
      this.router.navigate(['dashboard/lobby/new']);
    }
  }

}
