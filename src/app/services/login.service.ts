import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = environment.apiUrl;

  tokenExpired$: Subject<boolean> = new Subject<boolean>();
  tokenRefreshed$: Subject<boolean> = new Subject<boolean>();

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
  
  getRefreshToken(token: any) {
    const refreshTokenUrl = `${this.baseUrl}/users/refresh-token`;
    return this.http.post(refreshTokenUrl, token);
  }

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/']);
  }
}

 
