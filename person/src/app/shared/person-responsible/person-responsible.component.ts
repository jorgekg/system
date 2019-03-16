import { TranslateService } from '@ngx-translate/core';
import { CompanyService } from './../../core/entities/company/company.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-person-responsible',
  templateUrl: './person-responsible.component.html',
  styleUrls: ['./person-responsible.component.css']
})
export class PersonResponsibleComponent implements OnInit {

  @Input() responsible;
  @Input() personId;

  public permissionList;

  constructor(
    private companyService: CompanyService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    if (this.responsible === 'S') {
      this.get();
    }
  }

  public async createResponsible() {
    await this.companyService.insertCompanyUser({
      person_id: this.personId
    }).toPromise();
    await this.get();
  }

  public async get() {
    const permission = await
      this.companyService.getUserPermission(this.personId).toPromise() as any;
    if (permission && permission.contents) {
      this.permissionList = permission.contents;
    }
  }

  public getIcon(permission) {
    if (permission == 1) {
      return '<i class="fas fa-check"></i>';
    } else if (permission == 0) {
      return '<i class="fas fa-times"></i>';
    }
    return this.translateService.instant(permission);
  }

}
