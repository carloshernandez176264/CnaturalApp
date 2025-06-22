import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserType } from 'src/app/models/user-type';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  isLoggedIn = false;
  isAdmin = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private sessionStorage: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.sessionStorage.isLoggedIn$.subscribe(val => this.isLoggedIn = val);
    this.sessionStorage.isAdmin$.subscribe(val => this.isAdmin = val);
  }  

  logout(): void {
    this.sessionStorage.clear();    
    this.router.navigate(['/home']);
    this.sidenav.close();
  }

  closeSidenav(): void {
    this.sidenav.close();
  }
}
