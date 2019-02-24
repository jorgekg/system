import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const modal = classModal => {
  const wd = window as any;
  wd.jQuery(`.${classModal}`).modal('show');
};

const hide = classModal => {
  const wd = window as any;
  wd.jQuery(`.${classModal}`).modal('hide');
};

let itemDelete = null;

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input() id: number;
  @Input() classModal = 'modal-delete';
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onDelete() {
    this.delete.emit(itemDelete);
    hide(this.classModal);
  }

  public modaDelete() {
    itemDelete = this.id;
    modal(this.classModal);
  }

}