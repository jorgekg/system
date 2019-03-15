import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css']
})
export class EmptyStateComponent implements OnInit {

  @Input() message = 'not.fount';
  @Input() icon = 'fas fa-inbox';

  constructor() { }

  ngOnInit() {
  }

}
