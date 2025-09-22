import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../../services/invoices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
import { json } from '../../services/surveyjs/createSurvey/json'; // adjust path as needed

@Component({
  selector: 'app-edit-invoice',
  imports: [SurveyModule],
  templateUrl: './edit-invoice.component.html',
  styleUrl: './edit-invoice.component.scss'
})
export class EditInvoiceComponent implements OnInit {
  invoice: any = {};
  model!: Model;
  userId: string = '';
  invoiceId: string = '';

  constructor(
    private invoicesService: InvoicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //this function sends the form data to the backend to update an existing invoice
  editInvoice(sender: any, options: any) {
    const invoiceFormResults = sender.data;
    options.showSaveInProgress();
    this.invoicesService.updateInvoiceById(this.userId, this.invoiceId, {
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
        issueDate: invoiceFormResults.issueDate,
        dueDate: invoiceFormResults.dueDate,
        nameOnAccount: invoiceFormResults.nameOnAccount,
        sortCode: invoiceFormResults.sortCode,
        accountNumber: invoiceFormResults.accountNumber,
        bankName: invoiceFormResults.bankName,
    }).subscribe((response) => {
      setTimeout(() => {
          this.router.navigate([
            '/account/create-invoice/invoice-created/success',
          ]);
        }, 2000);
      options.showSaveComplete();
  });
}

  loadEditInvoiceForm() {
    this.invoicesService.getInvoiceById(this.userId, this.invoiceId).subscribe((invoice) => {
      this.invoice = invoice;
      this.model = new Model(json);
      this.model.data = this.invoice.payload[0];
      this.model.title = "Edit Invoice";
      this.model.onComplete.add(this.editInvoice.bind(this))
    });
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
    this.invoiceId = this.route.snapshot.paramMap.get('invoiceId') || '';
    this.loadEditInvoiceForm();
  }
}
