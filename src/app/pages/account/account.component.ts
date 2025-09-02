import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { Router } from '@angular/router';
//chartJs
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType, registerables, Chart } from 'chart.js';
Chart.register(...registerables);

//table with filtering, pagination and filtering
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface InvDataTypes {
  id: number;
  name: string;
  updated: Date;
  folder: string;
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
        folder: "work"
      },
      {
        id: 2,
        name: 'Fixing washing machine',
        updated: new Date('1/17/22'),
        folder: "home"
      },
      {
        id: 3,
        name: 'Cleaning',
        updated: new Date('1/28/23'),
        folder: "work"
      },
      {
        id: 4,
        name: 'Pest Control',
        updated: new Date('2/1/18'),
        folder: "work"
      },
      {
        id: 5,
        name: 'Internet',
        updated: new Date('2/17/16'),
        folder: "home"
      },
      {
        id: 6,
        name: 'Tv Subscription',
        updated: new Date('5/28/24'),
        folder: "other"
      },
    ];

@Component({
  selector: 'app-account',
  imports: [CommonModule, MatIconModule,MatDividerModule, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, BaseChartDirective],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})

export class AccountComponent {
  displayedColumns: string[] = ['icon', 'name', 'updated', 'options'];
  dataSource = new MatTableDataSource<InvDataTypes>(invoices);

  folderTally = computed(() => {
    return invoices.reduce((tally: Record<string, number>, invoice) => {
      tally[invoice.folder] = (tally[invoice.folder] || 0) + 1;
      return tally;
    }, {});
  });
  constructor(private router: Router) {
    
  }
  //Total invoices
  invoicesLength = invoices.length;
  //Most recent invoice
  recentInvoice = invoices.sort((a, b) => b.updated.getTime() - a.updated.getTime())[0].name;
  //Pie chart configuration
  pieChartType: ChartType = "pie";
  pieChartData = computed<ChartData<'pie'>>(() => {
    return {
      labels: Object.keys(this.folderTally()),
      datasets: [{
        data: Object.values(this.folderTally()),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }]
    }
  });
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      }
    }
  };

  //Filter invoices from table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Page navigation
  navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  alert(message: string) {
    window.alert(message);
  }
}