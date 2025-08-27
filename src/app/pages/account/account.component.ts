import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

//table with filtering, pagination and filtering
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface InvDataTypes {
  id: number;
  name: string;
  updated: Date;
}

export interface InvoiceData {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

const invoices: InvDataTypes[] = [
      {
        id: 1,
        name: 'Car wash',
        updated: new Date('1/1/16'),
      },
      {
        id: 2,
        name: 'Fixing washing machine',
        updated: new Date('1/17/16'),
      },
      {
        id: 3,
        name: 'Cleaning',
        updated: new Date('1/28/16'),
      },
      {
        id: 4,
        name: 'Pest Control',
        updated: new Date('2/1/16'),
      },
      {
        id: 5,
        name: 'Internet',
        updated: new Date('2/17/16'),
      },
      {
        id: 6,
        name: 'Tv Subscription',
        updated: new Date('5/28/16'),
      },
    ];

@Component({
  selector: 'app-account',
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})

export class AccountComponent {
  displayedColumns: string[] = ['icon', 'name', 'updated', 'options'];
  dataSource = new MatTableDataSource<InvDataTypes>(invoices);

  constructor(private router: Router) {
  }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  alert(message: string) {
    window.alert(message);
  }
}