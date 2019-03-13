import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-report',
  templateUrl: './card-report.component.html',
  styleUrls: ['./card-report.component.css']
})
export class CardReportComponent implements OnInit {

  @Input() theme = 'primary';
  @Input() title: string;
  @Input() icon = 'chart-line';
  @Input() value = '-';

  constructor() { }

  ngOnInit() {
    if (this.value === null || this.value === undefined) {
      this.value = '-';
    }
  }

}
