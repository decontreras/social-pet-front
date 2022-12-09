import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(inputdata: any) {
    return this.http.post(`${environment.api}auth/register`, inputdata);
  }

  login(logindata: any) {
    return this.http.post(`${environment.api}auth/login`, logindata);
  }
}
