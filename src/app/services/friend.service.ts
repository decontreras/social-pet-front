import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  request(data: any) {
    return this.http.post(`${environment.api}friend/request`, data);
  }

  listRequest(id) {
    return this.http.get(`${environment.api}friend/listRequest/${id}`);
  }

  listFriends(id) {
    return this.http.get(`${environment.api}friend/listFriends/${id}`);
  }

  listByUsers(user_1, user_2) {
    return this.http.get(`${environment.api}friend/listByUsers/${user_1}/${user_2}`);
  }

  acceptRequest(id) {
    return this.http.put(`${environment.api}friend/acceptRequest`, { id });
  }

  declineRequest(id) {
    return this.http.put(`${environment.api}friend/declineRequest`, { id });
  }
  
  getById(id) {
    return this.http.get(`${environment.api}friend/getById/${id}`);
  }
}
