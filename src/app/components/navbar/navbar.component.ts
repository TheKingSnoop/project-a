import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SignalService } from '../../services/signal.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  signalService = inject(SignalService);
  
  navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  isAccountPage(): boolean {
    return this.router.url === '/account';
  }

  isLoggedIn(): boolean {
    return this.loginService.getToken();
  }

  logout() {
    this.loginService.logout();
  }

}
