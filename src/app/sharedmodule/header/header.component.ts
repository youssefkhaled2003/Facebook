import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userData: any = null;

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.active$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (this.isLoggedIn) {
        this.userData = JSON.parse(localStorage.getItem('userData')!);
      }
    });
  }
}
