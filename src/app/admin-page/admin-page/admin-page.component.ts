import { HeaderService } from './../../sharedmodule/header/header.service';
import { SidebarService } from './../../sharedmodule/sidebar/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{

  constructor(private SidebarService:SidebarService,
    private HeaderService:HeaderService
  ){}

  ngOnInit(): void {
    this.SidebarService.activate();
    this.HeaderService.activate();
  }
}
