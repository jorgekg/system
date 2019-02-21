import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const modal = () => {
  const wd = window as any;
  wd.jQuery('#modalDelete').modal('show');
};

const hide = () => {
  const wd = window as any;
  wd.jQuery('#modalDelete').modal('hide');
};

let itemDelete = null;

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input() id: number;
  @Output() delete = new EventEmitter();

  

  constructor() { }

  ngOnInit() {
  }

  public onDelete() {
    this.delete.emit(itemDelete);
    hide();
  }

  public modaDelete() {
    itemDelete = this.id;
    modal();
  }

}