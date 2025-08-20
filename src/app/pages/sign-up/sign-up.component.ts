import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
import { json } from "../../services/surveyjs/signUp/json";


@Component({
  selector: 'app-sign-up',
  imports: [SurveyModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  model: Model;

  constructor() {
    this.model = new Model(json);
    this.setupValidation();
  }

  private setupValidation(): void {
    // Validate password confirmation
    this.model.onValidateQuestion.add((survey, options) => {
      if (options.name === 'confirmPassword') {
        const password = survey.getValue('password');
        const confirmPassword = options.value;
        if (password !== confirmPassword) {
          options.error = 'Passwords do not match';
        }
      }
    });

    // Also validate when password field changes
    this.model.onValueChanged.add((survey, options) => {
      if (options.name === 'password') {
        const confirmPassword = survey.getValue('confirmPassword');
        if (confirmPassword) {
          // Trigger validation for confirm password field
          const confirmPasswordQuestion =
            survey.getQuestionByName('confirmPassword');
          if (confirmPasswordQuestion) {
            confirmPasswordQuestion.hasErrors();
          }
        }
      }
    });
  }

  ngOnInit(): void {
    // Handle survey completion
    this.model.onComplete.add((survey) => {
      console.log('Survey results:', survey.data);
      // Handle the survey data here
    });
  }
}
