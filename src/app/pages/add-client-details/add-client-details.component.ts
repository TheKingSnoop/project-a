import { Component, OnInit } from '@angular/core';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
import { json } from '../../services/surveyjs/addClientDetailsSurvey/json';
import { jwtDecode } from 'jwt-decode';
import { EditMyDetailsService } from '../../services/editMyDetails.service';

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
    private editMyDetailsService: EditMyDetailsService
  ) {
    this.decodedJwtObject = { id: '', name: '' };
  }

  
  loadAddClientDetailsSurvey() {
    this.model = new Model(json);
    this.model.onComplete.add(this.submitAddClientDetails);
    console.log('Decoded JWT Object:', this.decodedJwtObject);
  }

  submitAddClientDetails(sender: any, options: any) {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedJwtObject = jwtDecode(token);
    }
    const myAddClientDetailsFormResults = sender.data;

    this.editMyDetailsService
    .addClientDetails(this.decodedJwtObject.id, myAddClientDetailsFormResults).subscribe(
      (response) => {
        console.log('Add Client Details Response:', response);
        options.showSaveInProgress();
        console.log('Add Client Details Form Results:', myAddClientDetailsFormResults);
        console.log('Decoded JWT Object:', this.decodedJwtObject);
      }
    );
  }

  ngOnInit() {   
    this.loadAddClientDetailsSurvey();
  }
}
