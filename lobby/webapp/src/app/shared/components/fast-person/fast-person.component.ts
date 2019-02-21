import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const show = () => {
  const _wd = window as any;
  _wd.jQuery(`.modal`).modal(`show`);
}

@Component({
  selector: 'app-fast-person',
  templateUrl: './fast-person.component.html',
  styleUrls: ['./fast-person.component.css']
})
export class FastPersonComponent implements OnInit {

  public documentTypeSelect;
  public mask;
  public documentTypeList = [];
  public documentTypeSetting = {
    singleSelection: true,
    idField: 'id',
    textField: 'label',
    enableCheckAll: false,
    itemsShowLimit: 5,
    allowSearchFilter: false,
    placeholder: this.translateService.instant('person.document_type.search'),
    searchPlaceholderText: this.translateService.instant('search')
  };

  public form: FormGroup;

  constructor(
    private activedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.documentTypeList = this.activedRoute.snapshot.data.scheduling.documentTypes;
    this.createForm();
    this.selectDefaultDocumentType();
    show();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      document_type_id: [],
      document: [],
      name: [],
      email: [],
      phone: []
    });
  }

  private selectDefaultDocumentType() {
    if (this.documentTypeList && this.documentTypeList.length > 0) {
      const [documentType] = this.documentTypeList;
      this.form.get('document_type_id').patchValue([documentType]);
      this.mask = documentType.mask;
    }
  }

}
