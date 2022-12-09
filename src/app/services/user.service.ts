import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id) {
    return this.http.get(`${environment.api}user/userById/${id}`);
  }

  getUserBySearch(text) {
    return this.http.get(`${environment.api}user/userBySearch/${text}`);
  }

  update(id, body) {
    return this.http.put(`${environment.api}user/update/${id}`, body);
  }
}
