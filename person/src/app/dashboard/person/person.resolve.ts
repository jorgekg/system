import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PersonService } from 'src/app/core/entities/person/person.service';

@Injectable()
export class PersonResolve implements Resolve<any> {
  constructor(
    private personService: PersonService,
    private appStorageService: AppStorageService
  ) {}

  async resolve() {
    return await this.getPerson();
  }

  private async getPerson() {
    return await new Promise(async resolve => {
      try {
        resolve(await this.personService.getPerson(0).toPromise());
      } catch (err) {
        resolve([]);
      }
    });
  }
}
