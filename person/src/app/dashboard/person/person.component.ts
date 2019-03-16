import { AppStorageService } from './../../core/app-storage/app-storage.service';
import { LobbyService } from './../../core/entities/lobby/lobby.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Person, PersonService } from 'src/app/core/entities/person/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  public personList = [] as Person[];
  public totalPages = 0;
  private atualPage = 0;
  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private appStorageService: AppStorageService
  ) { }

  ngOnInit() {
    if (!this.appStorageService.getToken()) {
    }
    this.getPerson();
  }

  private async getPerson() {
    this.personList = this.activedRoute.snapshot.data.people.contents;
    this.totalPages = this.activedRoute.snapshot.data.people.totalElements;
  }

  public async onPage(page) {
    this.atualPage = page.first;
    const people = await
    this.personService.getPerson(page.first).toPromise();
    for (let i = 0; i < people.contents.length; i++) {
      this.personList[page.first + i] = people.contents[i];
    }
    this.totalPages = people.totalElements;
  }

  public add() {
    this.router.navigate(['dashboard/lobby/new']);
  }
}
