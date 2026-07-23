import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
import { json } from '../../services/surveyjs/editMyDetailsSurvey/json';
import { jwtDecode } from 'jwt-decode';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { EditMyDetailsService } from '../../services/editMyDetails.service';

export interface JwtPayload {
  id: string;
  name: string;
}

@Component({
  selector: 'app-edit-my-details',
  imports: [SurveyModule],
  templateUrl: './edit-my-details.component.html',
  styleUrl: './edit-my-details.component.scss',
})
export class EditMyDetailsComponent implements OnInit {
  model!: Model;
  decodedJwtObject: JwtPayload;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private editMyDetailsService: EditMyDetailsService,
  ) {
    this.decodedJwtObject = { id: '', name: '' };
  }

  loadEditMyDetails(sender: any, options: any) {
    const myEditMyDetailsFormResults = sender.data;
    options.showSaveInProgress();
    // this.editMyDetailsService
    //   .editMyDetails({
    //     company_name: myEditMyDetailsFormResults.companyName,
    //     first_name: myEditMyDetailsFormResults.firstName,
    //     surname: myEditMyDetailsFormResults.surname,
    //     address: myEditMyDetailsFormResults.address,
    //     city: myEditMyDetailsFormResults.city,
    //     post_code: myEditMyDetailsFormResults.postCode,
    //     email: myEditMyDetailsFormResults.email,
    //     id: this.decodedJwtObject.id,
    //   })
    console.log('myEditMyDetailsFormResults', myEditMyDetailsFormResults);
      // .subscribe((response: any) => {
      //   setTimeout(() => {
      //     this.router.navigate([`/account`]);
      //   }, 2000);
      //   options.showSaveSuccess();
      // });
  }

  loadEditMyDetailsForm() {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedJwtObject = jwtDecode(token);
      this.model = new Model(json);
      this.model.onComplete.add(this.loadEditMyDetails.bind(this));
    }
  }

  ngOnInit(): void {
    this.loadEditMyDetailsForm();
    this.loginService.tokenRefreshed$.subscribe((res: boolean) => {
      if (res) {
        this.loadEditMyDetailsForm();
      }
    });
  }
}
