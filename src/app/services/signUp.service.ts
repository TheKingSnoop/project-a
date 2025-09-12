import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUser(userData: any) {
    const addUserUrl = `${this.baseUrl}/users/add-user`;
    return this.http.post(addUserUrl, userData);
  }
}
