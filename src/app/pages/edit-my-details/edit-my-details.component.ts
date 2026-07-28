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

export interface UserDetails {
  name: string;
  surname: string;
  email: string;
  address: string;
  city: string;
  postCode: string;
  companyName: string;
  telephone: string;
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
  userDetails: UserDetails;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private editMyDetailsService: EditMyDetailsService,
  ) {
    this.decodedJwtObject = { id: '', name: '' };
    this.userDetails = {
      name: '',
      surname: '',
      email: '',
      address: '',
      city: '',
      postCode: '',
      companyName: '',
      telephone: '',
    };
  }

  EditMyDetails(sender: any, options: any) {
    const myEditMyDetailsFormResults = sender.data;
    options.showSaveInProgress();
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedJwtObject = jwtDecode(token);
    }
    this.editMyDetailsService
      .editMyDetails(this.decodedJwtObject.id, {
        companyName: myEditMyDetailsFormResults.companyName,
        name: myEditMyDetailsFormResults.firstName,
        surname: myEditMyDetailsFormResults.surname,
        address: myEditMyDetailsFormResults.address,
        city: myEditMyDetailsFormResults.city,
        postCode: myEditMyDetailsFormResults.postCode,
        email: myEditMyDetailsFormResults.email,
      })
      .subscribe((response: any) => {
        setTimeout(() => {
          this.router.navigate([`/account`]);
        }, 2000);
        options.showSaveSuccess();
      });
  }

  loadEditMyDetailsForm() {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedJwtObject = jwtDecode(token);
      this.model = new Model(json);
      this.model.data = {
        companyName: this.userDetails.companyName,
        firstName: this.userDetails.name,
        surname: this.userDetails.surname,
        email: this.userDetails.email,
        address: this.userDetails.address,
        city: this.userDetails.city,
        postCode: this.userDetails.postCode,
        telephone: this.userDetails.telephone,
      };
      this.model.onComplete.add(this.EditMyDetails.bind(this));
    }
  }

  ngOnInit(): void {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedJwtObject = jwtDecode(token);
      this.loginService.getUserDetailsById(this.decodedJwtObject.id).subscribe((response: any) => {
        this.userDetails = response.payload;
        this.loadEditMyDetailsForm();
      });
    }
    this.loginService.tokenRefreshed$.subscribe((res: boolean) => {
      if (res) {
        this.loadEditMyDetailsForm();
      }
    });
  }
}
