import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    const loginUrl = `${this.baseUrl}/users/login`;
    return this.http.post(loginUrl, credentials);
  }

  getToken() {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      return true;
    } else {
      return false;
    }
  } 
  
  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/']);
  }
}

 
