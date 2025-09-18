import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

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

  getInvoiceURL(userId: any, invoiceId: any) {
    const invoiceUrl = `${this.baseUrl}/invoices/download-invoice/${userId}/${invoiceId}`;
    return this.http.get(invoiceUrl);
  }

  getAllInvoices(userId: string) {
    const allInvoicesUrl = `${this.baseUrl}/invoices/get-all-invoices/${userId}`;
    return this.http.get(allInvoicesUrl);
  }

  getInvoiceById(userId: string, invoiceId: string) {
    const invoiceByIdUrl = `${this.baseUrl}/invoices/get-invoice/${userId}/${invoiceId}`;
    return this.http.get(invoiceByIdUrl);
  }

  deleteInvoiceById(userId: string, invoiceId: string) {
    const deleteInvoiceUrl = `${this.baseUrl}/invoices/delete/${userId}/${invoiceId}`;
    return this.http.delete(deleteInvoiceUrl);
  }
}
