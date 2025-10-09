import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationData,
} from '../../components/confirmation-dialog/confirmation-dialog.component';
//table with filtering
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
//jwt-decode
import { jwtDecode } from 'jwt-decode';
import { InvoicesService } from '../../services/invoices.service';
//chartJs
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartData,
  ChartType,
  registerables,
  Chart,
} from 'chart.js';
import { LoginService } from '../../services/login.service';
Chart.register(...registerables);

export interface InvDataTypes {
  id: number;
  name: string;
  updated: Date;
  folder: string;
}

export interface JwtPayload {
  id: string;
  name: string;
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
  displayedColumns: string[];
  dataSource = new MatTableDataSource<InvDataTypes>();
  recentInvoice: string;
  invoicesLength: number;
  decodedJwtObject: JwtPayload;

  folderTally = computed(() => {
    return this.invoicesService
      .invoicesArray()
      .reduce((tally: Record<string, number>, invoice: any) => {
        tally[invoice.folder] = (tally[invoice.folder] || 0) + 1;
        return tally;
      }, {});
  });

  constructor(
    private router: Router,
    private invoicesService: InvoicesService,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {
    this.displayedColumns = ['icon', 'name', 'dateCreated', 'options'];
    this.recentInvoice = 'Loading...';
    this.invoicesLength = 0;
    this.decodedJwtObject = { id: '', name: '' };
  }

  deleteInvoice(userId: string, invoiceId: string) {
    const dialogData: ConfirmationData = {
      title: 'Delete Invoice',
      message:
        'Are you sure you want to delete this invoice? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // User confirmed deletion
        this.invoicesService
          .deleteInvoiceById(userId, invoiceId)
          .subscribe((result: any) => {
            if (result.success) {
              this.ngOnInit();
            } else {
              alert('Error deleting invoice');
            }
          });
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

  //Load dashboard data
  loadDashboard() {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedJwtObject = jwtDecode(token);
      this.invoicesService
        .getAllInvoices(this.decodedJwtObject.id)
        .subscribe((result: any) => {
          this.invoicesService.invoicesArray.set(result.payload);
          this.dataSource.data = result.payload;
          this.invoicesLength = this.invoicesService.invoicesArray().length;
          this.recentInvoice =
            this.invoicesService
              .invoicesArray()
              .slice()
              .sort(
                (a: any, b: any) =>
                  new Date(b.dateCreated).getTime() -
                  new Date(a.dateCreated).getTime()
              )[0]?.titleOfInvoice || 'No Invoices';
        });
    }
  }

  ngOnInit() {
    this.loadDashboard();
    this.loginService.tokenRefreshed$.subscribe((res: boolean) => {
      if(res) {
        this.loadDashboard();
      }
    });
  }
}
