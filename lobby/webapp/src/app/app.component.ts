import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppRequestService } from './core/app-request/app-request.service';
import { Message } from 'primeng/api';

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
  public msgs: Message[] = [];
  public err;
  public loaderCount = 0;

  constructor(
    private translate: TranslateService,
    private appRequestService: AppRequestService,
    private messageService: MessageService
  ) {
    this.messageService.messageObserver.subscribe(this.onMessageAdded);
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

  public onMessageAdded(msg: Message) {
    if (!this.msgs) {
      this.msgs = [];
      this.msgs.push(msg);
    }
  }
}
