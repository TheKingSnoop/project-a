import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
import { themeJson } from '../../styles/themes/surveyjsTheme';
import { json } from '../../services/surveyjs/createSurvey/json';
import { InvoicesService } from '../../services/invoices.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  imports: [SurveyModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss',
})
export class CreateInvoiceComponent implements OnInit {
  model!: Model;

  constructor(private invoicesService: InvoicesService, private  router: Router) {}

  //this function sends the form data to the backend to create a new invoice
  createInvoice(sender: any, options: any) {
    const invoiceFormResults = sender.data;
    console.log('Creating invoice with results:', invoiceFormResults);
    options.showSaveInProgress();
    this.invoicesService.createInvoice({
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
      id: "68c000d33d61719b5a89bb93" //update this hardcoded _id, do we still need this?
    }).subscribe((response) => {
      console.log('Invoice created successfully:', response);
      setTimeout(() => {
        this.router.navigate(['/account/invoice-created/success']);
      }, 2000);
      options.showSaveSuccess();
    });
  }

  //this function initializes the survey form
  loadCreateInvoiceForm() {
    const invoiceForm = new Model(json);
    //invoiceForm.css = themeJson; //unsure what this does so it is commented out for now
    this.model = invoiceForm;
    invoiceForm.onComplete.add(this.createInvoice.bind(this));
  }

  ngOnInit(): void {
    this.loadCreateInvoiceForm();
  }
}
