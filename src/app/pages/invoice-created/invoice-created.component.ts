import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-invoice-created',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './invoice-created.component.html',
  styleUrl: './invoice-created.component.scss',
})
export class InvoiceCreatedComponent {
  userId: string;
  invoiceId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoicesService: InvoicesService
  ) {
    this.userId = route.snapshot.paramMap.get('userId') || '';
    this.invoiceId = route.snapshot.paramMap.get('invoiceId') || '';
    console.log('userId:', this.userId);
    console.log('invoiceId:', this.invoiceId);
  }

  navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
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
}
