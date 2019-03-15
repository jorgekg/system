import { SchedulingService } from './../../core/entities/scheduling/scheduling.service';
import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/core/entities/report/report.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public cardReportScheduling;
  public cardReportCanceled;
  public rating = 0;

  constructor(
    private activedRoute: ActivatedRoute,
    private appStorageService: AppStorageService,
    private reportService: ReportService,
    private schedulingService: SchedulingService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.activedRoute.snapshot.data.home.cardReport) {
      this.cardReportScheduling = this.activedRoute.snapshot.data.home.cardReport.contents[0];
      this.cardReportCanceled = this.activedRoute.snapshot.data.home.cardReport.contents.length > 1
        ? this.activedRoute.snapshot.data.home.cardReport.contents[1]
        : null;
    }
    if (this.activedRoute.snapshot.data.home.rating) {
      const ratings = this.activedRoute.snapshot.data.home.rating.contents;
      if (ratings.length > 0) {
        this.rating = ratings[0].rating;
      }
    }
    if (!this.appStorageService.getToken()) {
      this.router.navigate(['dashboard/login']);
    }
    const lobby = this.activedRoute.snapshot.data.home.lobby;
    if (!lobby.contents || lobby.contents.length === 0) {
      this.router.navigate(['dashboard/lobby/new']);
    }
  }

  public async updateCardReport() {
    await this.reportService
      .updateCardReport(this.appStorageService.getactiveLobby().id).toPromise();
    this.update();
  }

  public async update() {
    const report = await this.reportService
      .getCardReport(this.appStorageService.getactiveLobby().id).toPromise();
    this.cardReportScheduling = report.contents[0];
    this.cardReportCanceled = report.contents.length > 1
      ? report.contents[1]
      : null;
    const ratings = await this.schedulingService.getRatingSum(
      this.appStorageService.getactiveLobby().id
    ).toPromise();
    if (ratings.contents.length > 0) {
      this.rating = ratings.contents[0].rating;
    }
  }

}
