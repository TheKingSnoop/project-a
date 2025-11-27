import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatListModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  cards = [
    {
      img: 'devices.jpg',
      title: 'Multi-Device Access',
      text: "Access your invoices from any device, whether it's a computer, tablet, or smartphone.",
    },
    {
      img: 'downloadPDF.jpg',
      title: 'Download as PDF',
      text: 'Convert your invoices to PDF with a single click.',
    },
    {
      img: 'calculateTax.jpg',
      title: 'Automatic Tax Calculation',
      text: 'No need to manually calculate totals or taxes, ensuring accuracy and saving you time.',
    },
  ];

  whyChooseList = [
    {
      text: 'Designed with simplicity in mind.',
      icon: 'thumb_up',
    },
    {
      text: 'Streamline your invoicing process.',
      icon: 'schedule',
    },
    {
      text: 'Save invoices to your account.',
      icon: 'save',
    },
    {
      text: 'Create and manage invoices. All in one place',
      icon: 'receipt_long',
    },
  ];

  isLoggedIn(): boolean {
    return this.loginService.getToken();
  }

  navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
