import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {

  constructor(
    private messageService: MessageService,
    private translateService: TranslateService
  ) { }

  public success(summaryToast, detailToast) {
    this.toast('success', summaryToast, detailToast);
  }

  public error(summaryToast, detailToast) {
    this.toast('error', summaryToast, detailToast);
  }

  private toast(severityToast, summaryToast, detailToast) {
    this.messageService.add({
      severity: severityToast,
      summary: this.translateService.instant(summaryToast),
      detail: this.translateService.instant(detailToast)
    });
  }
}
