import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EditMyDetailsService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  editMyDetails(id: string, editMyDetailsFormResults: any) {
    const editMyDetailsUrl = `${this.baseUrl}/users/update-user/${id}`;
    return this.http.put(editMyDetailsUrl, editMyDetailsFormResults);
  }

  addClientDetails(id: string, addClientDetailsFormResults: any) {
    const addClientDetailsUrl = `${this.baseUrl}/clients/add/${id}`;
    return this.http.post(addClientDetailsUrl, addClientDetailsFormResults);
  }

  getClientDetailsById(id: string) {
    const clientDetailsUrl = `${this.baseUrl}/clients/client/${id}`;
    return this.http.get(clientDetailsUrl);
  }
}
