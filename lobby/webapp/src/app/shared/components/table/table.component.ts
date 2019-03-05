import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() set data(data) {
    data = data && data.length > 0 ? data : [];
    this.manipuledData = data;
    this.defaultData = data;
  }
  @Input() totalElements = 0;
  @Input() columns;
  @Input() template;
  @Input() field;
  @Input() headerHide = false;
  @Input() modalDelete = 'delete-modal';
  @Input() hasDelete = true;
  @Input() styleClass = '';

  @Output() add = new EventEmitter();
  @Output() delete = new EventEmitter();
  public defaultData;
  public manipuledData;
  public page = 10;
  public searchInput;

  constructor() { }

  ngOnInit() {
  }

  public addItem() {
    this.add.emit();
  }

  public getPages() {
    return 
  }

  public search() {

  }

  public onDelete(id) {
    this.delete.emit(id);
  }

  private qtd() {
    const total = [];
    for(let i = 0; i < this.manipuledData.length; i++) {
      if (i === this.page) {
        total.push(1);
      }
    }
    total.push(1);
    return total;
  }

}
