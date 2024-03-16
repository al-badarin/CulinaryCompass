import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarOpen = false;

  constructor(private router: Router) {}

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
    this.isNavbarOpen = false; // Close the navbar after navigation
  }
}
