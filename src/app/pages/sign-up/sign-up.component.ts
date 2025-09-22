import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
import { json } from "../../services/surveyjs/signUp/json";
import { FormsModule } from '@angular/forms';
import { SignUpService } from '../../services/signUp.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  imports: [SurveyModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  model!: Model;

  constructor(private signUpService: SignUpService, private router: Router) {
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

  loadSignUpForm() {
    const signUpForm = new Model(json);
    this.model = signUpForm;
    this.setupValidation();
    signUpForm.onComplete.add(this.createUser.bind(this));
  }

  createUser(sender: any, options: any) {
    const signUpFormResults = sender.data;
    options.showSaveInProgress();
    this.signUpService.createUser({
      title: signUpFormResults.title,
      name: signUpFormResults.name,
      surname: signUpFormResults.surname,
      email: signUpFormResults.email,
      password: signUpFormResults.password
    }).subscribe((response) => {
      options.showSaveSuccess();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    });
  }

  ngOnInit(): void {
    this.loadSignUpForm();
  }
}
