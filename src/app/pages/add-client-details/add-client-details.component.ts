import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
import { json } from '../../services/surveyjs/addClientDetailsSurvey/json';
import { jwtDecode } from 'jwt-decode';
import { EditMyDetailsService } from '../../services/editMyDetails.service';
import { Router } from '@angular/router';


export interface JwtPayload {
  id: string;
  name: string;
}
@Component({
  selector: 'app-add-client-details',
  imports: [SurveyModule],
  templateUrl: './add-client-details.component.html',
  styleUrl: './add-client-details.component.scss'
})

export class AddClientDetailsComponent implements OnInit {
  model!: Model;
  decodedJwtObject: JwtPayload;

  constructor(
    private editMyDetailsService: EditMyDetailsService,
    private router: Router
  ) {
    this.decodedJwtObject = { id: '', name: '' };
  }
  
  submitAddClientDetails(sender: any, options: any) {
    const myAddClientDetailsFormResults = sender.data;
    options.showSaveInProgress();
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedJwtObject = jwtDecode(token);
    }
    this.editMyDetailsService
    .addClientDetails(this.decodedJwtObject.id, {
      company_name: myAddClientDetailsFormResults.companyName,
      first_name: myAddClientDetailsFormResults.firstName,
      surname: myAddClientDetailsFormResults.surname,
      address: myAddClientDetailsFormResults.address,
      city: myAddClientDetailsFormResults.city,
      post_code: myAddClientDetailsFormResults.postCode,
      email: myAddClientDetailsFormResults.email,
    }).subscribe({
        next: (response) => {
          setTimeout(() => {
          this.router.navigate([`/account`]);
        }, 2000);
            options.showSaveSuccess();
          },
          error: (error) => {
              console.error('Add Client Details Error:', error);
              options.showSaveError();
            }
          });
        }

        loadAddClientDetailsSurvey() {
          this.model = new Model(json);
          this.model.onComplete.add(this.submitAddClientDetails.bind(this));
        }
        
        ngOnInit() {   
          this.loadAddClientDetailsSurvey();
        }
}
