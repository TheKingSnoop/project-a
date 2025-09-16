import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from "survey-angular-ui";
import { json } from '../../services/surveyjs/login/json';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SurveyModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  model!: Model;

  constructor(private router: Router, private loginService: LoginService) {
  }

  loginResult: string = '';

  login(sender: any, options: any) {
    const formResults = sender.data
    console.log('Logging in with results:', formResults);
    this.loginService.login({
      email: formResults.email,
      password: formResults.password
    }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem("jwt_token", (response as any).token);
        this.router.navigate(['/account']);
      },
      error: (error) => {
        console.error('Login failed:', error.error.message);
        this.loginResult = error.error.message;
      }
    });
  }

  //this function initializes the login form
  loadLoginForm() {
    const loginForm = new Model(json);
    this.model = loginForm;
    loginForm.onComplete.add(this.login.bind(this));
  }

  ngOnInit(): void {
    this.loadLoginForm();
  }
}
