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

  public permissionList = [];

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit() {
  }

  public async createResponsible() {
    await this.companyService.insertCompanyUser({
      person_id: this.personId
    }).toPromise();
  }

  public async get() {
    const permission = await
      this.companyService.getUserPermission(this.personId).toPromise() as any;
    if (permission && permission.contents.length > 0) {
      this.permissionList = permission.contents;
    }
  }

}
