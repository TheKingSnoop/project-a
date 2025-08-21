import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private http: HttpClient) {}

  createInvoice(invoiceFormData: any) {
    const createInvoiceUrl = '/invoices/createNewInvoice';
    console.log('Creating invoice with data:', invoiceFormData);

     return this.http.post(createInvoiceUrl, invoiceFormData);
  }
}
