import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

const show = () => {
  const wd = window as any;
  if (wd.jQuery('#accordionSidebar').hasClass('toggled')) {
    wd.jQuery('#accordionSidebar').removeClass('toggled');
  } else {
    wd.jQuery('#accordionSidebar').addClass('toggled')
  }
}

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  @Input() title: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public menuLeft() {
    show();
  }

  public logoff() {
    localStorage.clear();
    this.router.navigate([`dashboard/login`]);
  }

}
