import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';

const surveyJson = {
  "title": "Sign Up",
  "description": "Create an account",
  "completedHtml": '<div style="text-align: center; height: 100%; max-width:540px; text-align:center; margin:0px auto 16px auto; border: 1px solid rgba(0,0,0,0.25); padding:40px 48px 48px 48px; background-color:#fff;"><h3>Thank you for signing up!</h3><p>Your account has been created successfully. You will receive a confirmation email shortly.</p></div>',
  "completeText": "Sign Up",
  "pages": [
    {
      "name": "page1",
      "description": "Sign Up",
      "elements": [
        {
          "type": "panel",
          "name": "accountData",
          "title": "Account Details:",
          "elements": [
            {
              "type": "radiogroup",
              "name": "title",
              "title": "Title:",
              "isRequired": true,
              "choices": [
                {
                  "value": "mr",
                  "text": "Mr"
                },
                {
                  "value": "ms",
                  "text": "Ms"
                },
                {
                  "value": "mrs",
                  "text": "Mrs"
                },
                {
                  "value": "dr",
                  "text": "Dr"
                }
              ],
              "colCount": 5
            },
            {
              "type": "text",
              "name": "firstName",
              "title": "First Name:",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "surname",
              "startWithNewLine": false,
              "title": "Surname:",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "email",
              "title": "Email:",
              "isRequired": true,
              "inputType": "email"
            },
            {
              "type": "text",
              "name": "password",
              "title": "Password:",
              "isRequired": true,
              "inputType": "password"
            },
            {
              "type": "text",
              "name": "confirmPassword",
              "startWithNewLine": false,
              "title": "Confirm Password",
              "isRequired": true
            }
          ]
        }
      ]
    }
  ],
  "triggers": [
    {
      "type": "complete",
      "expression": "{firstName} notempty and {surname} notempty and {password} notempty and {confirmPassword} notempty and {title} notempty"
    }
  ],
  "headerView": "advanced"
}

@Component({
  selector: 'app-sign-up',
  imports: [SurveyModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  survey: Model;

  constructor() {
    this.survey = new Model(surveyJson);
    this.setupValidation();
  }

  private setupValidation(): void {
    // Validate password confirmation
    this.survey.onValidateQuestion.add((survey, options) => {
      if (options.name === 'confirmPassword') {
        const password = survey.getValue('password');
        const confirmPassword = options.value;
        if (password !== confirmPassword) {
          options.error = 'Passwords do not match';
        }
      }
    });

    // Also validate when password field changes
    this.survey.onValueChanged.add((survey, options) => {
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
    this.survey.onComplete.add((survey) => {
      console.log('Survey results:', survey.data);
      // Handle the survey data here
    });
  }
}
