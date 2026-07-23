import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EditMyDetailsService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  editMyDetails(editMyDetailsFormResults: any) {
    const editMyDetailsUrl = `${this.baseUrl}/users/edit-my-details`;
    return this.http.put(editMyDetailsUrl, editMyDetailsFormResults);
  }
}
