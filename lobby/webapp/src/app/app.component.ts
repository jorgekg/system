import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppRequestService } from './core/app-request/app-request.service';

const show = () => {
  const windowJ = window as any;
  windowJ.jQuery('.toast').toast('show');
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'froom';

  public err;
  public loaderCount = 0;

  constructor(
    private translate: TranslateService,
    private appRequestService: AppRequestService
  ) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
    this.appRequestService.getError().subscribe(err => {
      this.err = err;
      show();
    });
    this.appRequestService.getLoader().subscribe(loaderCount => {
      this.loaderCount = loaderCount;
    }
    );
  }
}
