import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-person-on-list',
  templateUrl: './person-on-list.component.html',
  styleUrls: ['./person-on-list.component.css']
})
export class PersonOnListComponent implements OnInit {

  @Input() list = [];

  constructor() { }

  ngOnInit() {
  }

}