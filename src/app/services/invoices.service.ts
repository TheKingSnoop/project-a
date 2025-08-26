import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createInvoice(invoiceFormResults: any) {
    const createInvoiceUrl = `${this.baseUrl}/invoices/generate`;
    return this.http.post(createInvoiceUrl, invoiceFormResults);
  }
}
