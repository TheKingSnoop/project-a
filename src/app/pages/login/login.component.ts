import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from "survey-angular-ui";
import { json } from '../../services/surveyjs/login/json';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { max } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [SurveyModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  model!: Model;
  loginResult: string;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginResult = '';
  }

  navigateToPage(page:string) {
    this.router.navigate([`/${page}`]);
  }

  login(sender: any, options: any) {
    const formResults = sender.data
    this.loginService.login({
      email: formResults.email,
      password: formResults.password
    }).subscribe({
      next: (response) => {
        localStorage.setItem("jwt_token", (response as any).accessToken);
        localStorage.setItem("refresh_token", (response as any).refreshToken);
        options.showSaveSuccess();
        setTimeout(() => {
          this.navigateToPage('account');
        }, 3000);
      },
      error: (error) => {
        this.loginResult = error.error.message;
      }
    });
  }

  //this function initializes the login form
  loadLoginForm() {
    this.model = new Model(json);
    this.model.onComplete.add(this.login.bind(this));
  }

  ngOnInit(): void {
    this.loadLoginForm();
  }
}
