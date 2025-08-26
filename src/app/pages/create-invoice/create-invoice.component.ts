import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
import { themeJson } from '../../styles/themes/surveyjsTheme';
import { json } from '../../services/surveyjs/createSurvey/json';
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-create-invoice',
  imports: [SurveyModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss',
})
export class CreateInvoiceComponent implements OnInit {
  model!: Model;

  constructor(private invoicesService: InvoicesService) {}

  //this function sends the form data to the backend to create a new invoice
  createInvoice(sender: any, options: any) {
    const invoiceFormResults = sender.data;
    console.log('Creating invoice with results:', invoiceFormResults);
    options.showSaveInProgress();
    this.invoicesService.createInvoice(invoiceFormResults).subscribe((response) => {
      console.log('Invoice created successfully:', response);
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
