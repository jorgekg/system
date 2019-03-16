import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent implements OnInit {

  @Input() message = 'not.fount';
  @Input() icon = 'fas fa-inbox';
  @Input() add;

  @Output() clickAdd = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onAdd() {
    this.clickAdd.emit();
  }

}
