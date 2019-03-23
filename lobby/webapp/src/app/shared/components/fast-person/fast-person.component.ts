import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { PersonService } from './../../../core/entities/person/person.service';
import { ContactTypeEnum } from './../../enum/contact-type.enum';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Person } from 'src/app/core/entities/person/person.service';

const show = classModal => {
  const _wd = window as any;
  _wd.jQuery(`.${classModal}`).modal(`show`);
};

const hide = classModal => {
  const _wd = window as any;
  _wd.jQuery(`.${classModal}`).modal(`hide`);
};

@Component({
  selector: 'app-fast-person',
  templateUrl: './fast-person.component.html',
  styleUrls: ['./fast-person.component.css']
})
export class FastPersonComponent implements OnInit {
  @ViewChild(`button`) button: ElementRef;

  @Input() set personName(name) {
    if (name) {
      this.form.reset();
      this.validator = false;
      this.selectDefaultDocumentType();
      this.form.get('name').patchValue(name);
      show(this.classModal);
    }
  }
  @Input() responsible: boolean;
  @Input() classModal = `person-modal`;
  @Output() selectPerson = new EventEmitter<Person>();

  public validator = false;

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
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private appStorageService: AppStorageService
  ) { }

  ngOnInit() {
    this.documentTypeList = this.activedRoute.snapshot.data.scheduling.documentTypes;
    this.createForm();
    this.selectDefaultDocumentType();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      document_type_id: new FormControl(``, Validators.compose([Validators.required])),
      document: [],
      name: new FormControl(``, Validators.compose([Validators.required])),
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

  public async save() {
    this.validator = true;
    (this.button.nativeElement as HTMLInputElement).innerHTML =
      this.translateService.instant('await');
    if (this.form.valid) {
      const form = this.form.getRawValue();
      const person = {
        name: form.name,
        company_id: this.appStorageService.getToken().company_id,
        responsible: this.responsible ? 'S' : 'N',
        active: 'S',
        update_at: new Date()
      } as Person;
      person.documents = [
        {
          document_type_id: form.document_type_id[0].id,
          document: form.document
        }
      ];
      person.emails = [
        {
          contact_type_id: ContactTypeEnum.EMAIL,
          contact: form.email
        }
      ];
      person.phones = [
        {
          contact_type_id: ContactTypeEnum.PHONE,
          contact: form.phone
        }
      ];
      const people = await this.personService.createPerson(person).toPromise();
      const [peopleContents] = people.contents;
      this.selectPerson.emit(peopleContents);
      hide(this.classModal);
      this.form.reset();
    }
    (this.button.nativeElement as HTMLInputElement).innerHTML =
      this.translateService.instant('add');
  }
}
