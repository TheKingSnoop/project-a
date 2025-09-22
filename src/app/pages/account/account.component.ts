import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

//chartJs
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartData,
  ChartType,
  registerables,
  Chart,
} from 'chart.js';
Chart.register(...registerables);

//table with filtering, pagination and filtering
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { jwtDecode } from 'jwt-decode';
import { InvoicesService } from '../../services/invoices.service';

export interface InvDataTypes {
  id: number;
  name: string;
  updated: Date;
  folder: string;
}

@Component({
  selector: 'app-account',
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    BaseChartDirective,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent { 
  displayedColumns: string[] = ['icon', 'name', 'dateCreated', 'options'];
  dataSource = new MatTableDataSource<InvDataTypes>();
  recentInvoice: string = "Loading...";
  invoicesLength: number = 0;
  decodedJwtObject: any = {};


  folderTally = computed(() => {
    return this.invoicesService.invoicesArray().reduce((tally: Record<string, number>, invoice: any) => {
      tally[invoice.folder] = (tally[invoice.folder] || 0) + 1;
      return tally;
    }, {});
  });
  constructor(
    private router: Router,
    private invoicesService: InvoicesService
  ) {}

  deleteInvoice(userId: string, invoiceId: string) {
    this.invoicesService.deleteInvoiceById(userId, invoiceId).subscribe((result: any) => {
      if (result.success) {
        this.ngOnInit(); // Refresh the data
      } else {
        alert('Error deleting invoice');
      }
    });
  }
 
  //Pie chart configuration
  pieChartType: ChartType = 'pie';
  pieChartData = computed<ChartData<'pie'>>(() => {
    return {
      labels: Object.keys(this.folderTally()),
      datasets: [
        {
          data: Object.values(this.folderTally()),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
        },
      ],
    };
  });
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
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

 navigateToEditInvoice(userId: string, invoiceId: string) {
  this.router.navigate([`/account/edit-invoice`, userId, invoiceId]);
}

  ngOnInit() {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedJwtObject = jwtDecode(token);
    }

    this.invoicesService
      .getAllInvoices(this.decodedJwtObject.id)
      .subscribe((result: any) => {
        this.invoicesService.invoicesArray.set(result.payload);
        this.dataSource.data = result.payload;
        this.invoicesLength = this.invoicesService.invoicesArray().length;
        this.recentInvoice = this.invoicesService.invoicesArray()
      .slice()
      .sort((a: any, b: any) => 
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      )[0]?.titleOfInvoice || 'No Invoices';
      });
  }
}
