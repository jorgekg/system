import { PhoneMaskPipe } from './../pipe/phone.pipe';
import { PersonContactService } from './../../core/entity/person-contact/person-contact.service';
import { AppToastService } from './../../core/app-toast/app-toast.service';
import { DocumentTypeService } from './../../core/entities/document-type/document-type.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PersonDocumentService } from 'src/app/core/entity/person-document/person-document.service';

const showModalContact = (type) => {
  const wd = window as any;
  wd.jQuery(`#modal-contacts${type}`).modal('show');
};

const closeModalContact = (type) => {
  const wd = window as any;
  wd.jQuery(`#modal-contacts${type}`).modal('hide');
};

@Component({
  selector: 'app-person-contact',
  templateUrl: './person-contact.component.html',
  styleUrls: ['./person-contact.component.css']
})
export class PersonContactComponent implements OnInit {
  @Input() type;

  public contactList: Document[];
  public validator = false;

  public form: FormGroup;
  public mask;
  public personId: number;

  constructor(
    private formBuilder: FormBuilder,
    private activedRoute: ActivatedRoute,
    private appToastService: AppToastService,
    private personContactService: PersonContactService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      contact_type_id: new FormControl(this.type, Validators.compose([Validators.required])),
      contact: new FormControl('', Validators.compose([Validators.required]))
    });
    this.getContact();
  }

  private getContact() {
    this.activedRoute.params.subscribe(async params => {
      this.personId = params.id;
      try {
        const docs = await this.personContactService.get(this.personId, this.type).toPromise() as any;
        if (docs && docs.contents.length > 0) {
          this.contactList = docs.contents;
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  public format(str) {
    if (this.type == 2) {
      const pipe = new PhoneMaskPipe();
      return pipe.transform(str);
    }
    return str;
  }

  public add() {
    showModalContact(this.type);
  }

  public async delete(id) {
    await this.personContactService.delete(id, this.personId).toPromise();
    this.appToastService.success('success', 'contact.delete.success');
    this.getContact();
  }

  public async save() {
    this.validator = true;
    if (this.form.valid) {
      const form = this.form.getRawValue();
      form.person_id = this.personId;
      closeModalContact(this.type);
      await this.personContactService.insert(form).toPromise();
      this.getContact();
      await this.appToastService.success('success', 'contact.insert.success');
    }
  }

}
