import { AppStorageService } from './../../../core/app-storage/app-storage.service';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PersonService } from 'src/app/core/entities/person/person.service';

@Injectable()
export class PersonPersistResolve implements Resolve<any> {
  constructor(
    private personService: PersonService,
    private appStorageService: AppStorageService,
    private router: Router
  ) {}

  async resolve(route: ActivatedRouteSnapshot) {
    return await this.getPerson(route.params);
  }

  private async getPerson(params) {
    return await new Promise(async resolve => {
      try {
        if (params.id === 'new') {
          resolve();
        } else {
          const person = await this.personService.getAll(params.id).toPromise();
          if (person && person.contents.length > 0) {
            resolve(person);
          } else {
            resolve(null);
            this.router.navigate(['error/404']);
          }
        }
      } catch (err) {
        resolve([]);
      }
    });
  }
}
