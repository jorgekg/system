import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const modal = classModal => {
  const wd = window as any;
  wd.jQuery(`#${classModal}`).modal('show');
};

const hideCancel = classModal => {
  const wd = window as any;
  wd.jQuery(`#${classModal}`).modal('hide');
};

let itemCancel = null;

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {

  @Input() id: number;
  @Input() isIcon = true;
  @Input() classModal = 'modal-cancel';
  @Output() cancel = new EventEmitter();
  @Output() redial = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onRedial() {
    this.redial.emit(itemCancel);
    hideCancel(this.classModal);
  }

  public onCancel() {
    this.cancel.emit(itemCancel);
    hideCancel(this.classModal);
  }

  public modaCancel() {
    itemCancel = this.id;
    modal(this.classModal);
  }

  public close() {
    hideCancel(this.classModal);
  }

}