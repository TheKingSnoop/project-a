import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
