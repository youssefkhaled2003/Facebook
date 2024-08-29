import { HeaderService } from './../../sharedmodule/header/header.service';
import { HeaderComponent } from './../../sharedmodule/header/header.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',

  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  constructor(private HeaderService:HeaderService){}
  ngOnInit(): void {
    this.HeaderService.activate();

  }
}
