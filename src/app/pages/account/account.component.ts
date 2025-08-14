import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

export interface InvDataTypes {
  name: string;
  updated: Date;
}

export interface InvoiceData {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

@Component({
  selector: 'app-account',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})


export class AccountComponent {
  constructor(private router: Router) {

  }
  invoices: InvDataTypes[] = [
      {
        name: 'Invoice 1 testing for a very long name',
        updated: new Date('1/1/16'),
      },
      {
        name: 'Invoice 2',
        updated: new Date('1/17/16'),
      },
      {
        name: 'Invoice 3',
        updated: new Date('1/28/16'),
      },
      {
        name: 'Invoice 4',
        updated: new Date('2/1/16'),
      },
      {
        name: 'Invoice 5',
        updated: new Date('2/17/16'),
      },
      {
        name: 'Invoice 6',
        updated: new Date('5/28/16'),
      },
    ];

    navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }
}