import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from "survey-angular-ui";
import { json } from '../../services/surveyjs/login/json';

@Component({
  selector: 'app-login',
  imports: [SurveyModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  model: Model;

  constructor() {
    this.model = new Model(json);
  }

  ngOnInit(): void {
    this.model.onComplete.add(survey => {
      console.log("survey results", survey.data);
    })
  }
}
