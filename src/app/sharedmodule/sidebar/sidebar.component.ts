import { SidebarService } from './sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin =false;
  isCollapsed = true;
  userData: any = null;
  constructor(private SidebarService:SidebarService){}
  ngOnInit() {
    this.SidebarService.active$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;});
    if (localStorage.getItem('userData')) {
      this.userData = JSON.parse(localStorage.getItem('userData')!);
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
