import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { InvoicesService } from '../../services/invoices.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationData,
} from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-invoice-id',
  imports: [
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatSidenavModule,
    CommonModule,
    MatGridListModule,
    MatTableModule,
    MatSnackBarModule,
  ],
  templateUrl: './invoice-id.component.html',
  styleUrl: './invoice-id.component.scss',
})
export class InvoiceIdComponent implements OnInit {
  // Signals
  invoice = signal<any>(null);
  isMobile = signal<boolean>(false);

  // Table columns
  displayedColumns: string[];

  // Computed properties
  columnSpan = computed(() => (this.isMobile() ? 2 : 1));

  // Route parameters
  userId: string;
  invoiceId: string;
  constructor(
    private route: ActivatedRoute,
    private invoicesService: InvoicesService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    // Observe breakpoints for mobile responsiveness
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result: BreakpointState) => {
        this.isMobile.set(result.matches);
      });

    this.userId = this.route.snapshot.paramMap.get('userId') || '';
    this.invoiceId = this.route.snapshot.paramMap.get('invoiceId') || '';
    this.displayedColumns = ['description', 'quantity', 'unitPrice', 'amount'];
  }

  deleteInvoice() {
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
          .deleteInvoiceById(this.userId, this.invoiceId)
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

  navigateToEditInvoice() {
    this.router.navigate([
      `/account/edit-invoice`,
      this.userId,
      this.invoiceId,
    ]);
  }

  loadInvoiceById() {
    this.route.params.subscribe((params) => {
      const userId = params['userId'];
      const invoiceId = params['invoiceId'];
      this.invoicesService
        .getInvoiceById(userId, invoiceId)
        .subscribe((response: any) => {
          this.invoice.set(response.payload[0]);
        });
    });
  }

  downloadInvoice() {
    return this.invoicesService
      .getInvoiceURL(this.userId, this.invoiceId)
      .subscribe((response: any) => {
        if (response.success && response.payload.downloadUrl) {
          const downloadUrl = response.payload.downloadUrl;
          window.open(downloadUrl, '_blank');
        } else {
          console.error('Invalid response format:', response);
        }
      });
  }

  ngOnInit(): void {
    this.loadInvoiceById();
  }
}
