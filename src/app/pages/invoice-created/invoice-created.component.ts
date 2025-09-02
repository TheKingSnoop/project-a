import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-created',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './invoice-created.component.html',
  styleUrl: './invoice-created.component.scss'
})
export class InvoiceCreatedComponent {
  constructor(private router: Router) {}

 navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }
}