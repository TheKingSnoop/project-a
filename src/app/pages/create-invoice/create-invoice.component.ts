import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
import { json } from '../../services/surveyjs/createSurvey/json';
import { InvoicesService } from '../../services/invoices.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  id: string;
  name: string;
}
@Component({
  selector: 'app-create-invoice',
  imports: [SurveyModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss',
})
export class CreateInvoiceComponent implements OnInit {
  model!: Model;
  decodedJwtObject: JwtPayload;

  constructor(
    private invoicesService: InvoicesService,
    private router: Router
  ) {
    this.decodedJwtObject = { id: '', name: '' };
  }

  formatDate(dateString: string) {
    if (dateString == "" || dateString == null || dateString == undefined) return '';
    else {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    }
  }

  //this function sends the form data to the backend to create a new invoice
  createInvoice(sender: any, options: any) {
    const invoiceFormResults = sender.data;
    //format the dates to DD/MM/YYYY
    const formattedIssueDate = this.formatDate(invoiceFormResults.issueDate);
    const formattedDueDate = this.formatDate(invoiceFormResults.dueDate);
    console.log(formattedDueDate);
    options.showSaveInProgress();
    this.invoicesService
      .createInvoice({
        vatPercentage: invoiceFormResults.vatPercentage,
        invoiceItemsTotal: invoiceFormResults['invoiceItems-total'].amount,
        vat: invoiceFormResults.vat,
        finalTotal: invoiceFormResults.finalTotal,
        invoiceItems: invoiceFormResults.invoiceItems,
        titleOfInvoice: invoiceFormResults.titleOfInvoice,
        nameOfYourCompany: invoiceFormResults.nameOfYourCompany,
        yourName: invoiceFormResults.yourName,
        yourSurname: invoiceFormResults.yourSurname,
        yourAddress: invoiceFormResults.yourAddress,
        yourCity: invoiceFormResults.yourCity,
        yourPostCode: invoiceFormResults.yourPostCode,
        yourEmail: invoiceFormResults.yourEmail,
        phoneNumber: invoiceFormResults.phoneNumber,
        companyName: invoiceFormResults.companyName,
        clientName: invoiceFormResults.clientName,
        clientSurname: invoiceFormResults.clientSurname,
        clientAddress: invoiceFormResults.clientAddress,
        clientCity: invoiceFormResults.clientCity,
        clientPostCode: invoiceFormResults.clientPostCode,
        clientEmail: invoiceFormResults.clientEmail,
        referenceNumber: invoiceFormResults.referenceNumber,
        issueDate: formattedIssueDate,
        dueDate: formattedDueDate,
        nameOnAccount: invoiceFormResults.nameOnAccount,
        sortCode: invoiceFormResults.sortCode,
        accountNumber: invoiceFormResults.accountNumber,
        bankName: invoiceFormResults.bankName,
        id: this.decodedJwtObject.id,
      })
      .subscribe((response: any) => {
        const invoiceId = response.payload.dbInvoiceId;
        setTimeout(() => {
          this.router.navigate([
            `/account/create-invoice/invoice-created/${this.decodedJwtObject.id}/${invoiceId}/success`,
          ]);
        }, 2000);
        options.showSaveSuccess();
      });
  }

  //this function initializes the survey form
  loadCreateInvoiceForm() {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedJwtObject = jwtDecode(token);
      this.model = new Model(json);
      this.model.onComplete.add(this.createInvoice.bind(this));
    }
  }
  
  ngOnInit(): void {
    this.loadCreateInvoiceForm();
  }
}
