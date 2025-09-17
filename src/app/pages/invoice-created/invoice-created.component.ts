import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-invoice-created',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './invoice-created.component.html',
  styleUrl: './invoice-created.component.scss',
})
export class InvoiceCreatedComponent {
  constructor(
    private router: Router,
    private invoicesService: InvoicesService
  ) {}

  navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  downloadInvoice() {
    return this.invoicesService
    //update this with real dynnamic values
      .getInvoiceURL('68c000d33d61719b5a89bb93', '68c2bba5d6a3b0e59f89991c')
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
