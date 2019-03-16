import { AppToastService } from './../../core/app-toast/app-toast.service';
import { PersonDocumentService } from './../../core/entity/person-document/person-document.service';
import { DocumentTypeService } from './../../core/entities/document-type/document-type.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const showModalDoc = () => {
  const wd = window as any;
  wd.jQuery('#modal-documents').modal('show');
};

const closeModalDoc = () => {
  const wd = window as any;
  wd.jQuery('#modal-documents').modal('hide');
};

@Component({
  selector: 'app-person-documents',
  templateUrl: './person-documents.component.html',
  styleUrls: ['./person-documents.component.css']
})
export class PersonDocumentsComponent implements OnInit {

  public documentList: Document[];
  public validator = false;
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
  public mask;
  public personId: number;

  constructor(
    private formBuilder: FormBuilder,
    private activedRoute: ActivatedRoute,
    private documentTypeService: DocumentTypeService,
    private translateService: TranslateService,
    private personDocumentService: PersonDocumentService,
    private appToastService: AppToastService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      document_type_id: new FormControl('', Validators.compose([Validators.required])),
      document: new FormControl('', Validators.compose([Validators.required]))
    });
    this.getDocType();
    this.getDoc();
  }

  private getDoc() {
    this.activedRoute.params.subscribe(async params => {
      this.personId = params.id;
      try {
        const docs = await this.personDocumentService.get(this.personId).toPromise() as any;
        if (docs && docs.contents.length > 0) {
          this.documentList = docs.contents;
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  private selectDefaultDocumentType() {
    if (this.documentTypeList && this.documentTypeList.length > 0) {
      const [documentType] = this.documentTypeList;
      this.form.get('document_type_id').patchValue([documentType]);
      this.mask = documentType.mask;
    }
  }

  public async getDocType() {
    const documentType = await this.documentTypeService.get().toPromise();
    if (documentType && documentType.contents.length > 0) {
      this.documentTypeList = documentType.contents;
      this.selectDefaultDocumentType();
    }
  }

  public getDocTypeName(id) {
    const docType = this.documentTypeList.filter(type => type.id === id);
    if (docType && docType.length > 0) {
      return docType[0].label;
    }
    return '-';
  }

  public add() {
    showModalDoc();
  }

  public async delete(id) {
    await this.personDocumentService.delete(id, this.personId).toPromise();
    this.appToastService.success('success', 'document.delete.success');
    this.getDoc();
  }

  public async save() {
    this.validator = true;
    if (this.form.valid) {
      const form = this.form.getRawValue();
      form.document_type_id = form.document_type_id[0].id;
      form.person_id = this.personId;
      closeModalDoc();
      await this.personDocumentService.insert(form).toPromise();
      this.getDoc();
      await this.appToastService.success('success', 'document.insert.success');
    }
  }

}