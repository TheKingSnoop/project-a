import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
constructor(private router: Router, private loginService: LoginService, private snackBar: MatSnackBar) {}
  navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  isLoggedIn(): boolean {
    return this.loginService.getToken();
  }

  logout() {
    this.loginService.logout();
     this.snackBar.open('Logged out successfully.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/login']);
  }
}