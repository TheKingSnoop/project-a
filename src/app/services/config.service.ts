import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any = null;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<any> {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(config => {
        this.config = config;
        return config;
      });
  }

  getApiUrl(): string {
    return this.config?.apiUrl || 'http://localhost:3000';
  }
}
