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

  constructor(
    private invoicesService: InvoicesService
  ) {
    // this.model = new Model(json);
    // this.model.css = themeJson;
  }

  createInvoice(sender: any, options: any) {
    const results = sender.data;
    console.log('Creating invoice with results:', results);
    options.showSaveInProgress();
    this.invoicesService.createInvoice(results).subscribe((response)=>{
      console.log('Invoice created successfully:', response);
      options.showSaveSuccess();
    })
  }

  loadCreateInvoiceForm() {
    const invoiceForm = new Model(json);
    //invoiceForm.css = themeJson;
    this.model = invoiceForm;
    invoiceForm.onComplete.add(this.createInvoice.bind(this));
  }

  ngOnInit(): void {
    this.loadCreateInvoiceForm();
  }
}
