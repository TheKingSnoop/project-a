import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
import { themeJson } from '../../styles/themes/surveyjsTheme';
import { json } from '../../services/surveyjs/createSurvey/json';

@Component({
  selector: 'app-create-invoice',
  imports: [SurveyModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss',
})
export class CreateInvoiceComponent implements OnInit {
  model: Model;

  constructor() {
    this.model = new Model(json);
    this.model.css = themeJson;
  }

  ngOnInit(): void {
    this.model.onComplete.add((sender, options) => {
      console.log(JSON.stringify(sender.data, null, 3));
    });
  }
}
