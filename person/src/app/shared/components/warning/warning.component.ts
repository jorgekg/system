import { Component, OnInit, Input } from '@angular/core';

const tooltip = () => {
  const _wd = window as any;
  _wd.jQuery('[data-toggle="tooltip"]').tooltip();
}

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {

  @Input() set message(message) {
    this.messageInternal = message;
    tooltip();
  }

  public messageInternal;

  constructor() { }

  ngOnInit() {
  }

}
