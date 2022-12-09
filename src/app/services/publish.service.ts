import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublishService {

  constructor(private http: HttpClient) { }

  newPublish(data: any) {
    return this.http.post(`${environment.api}publish/newPublish`, data);
  }

  list() {
    return this.http.get(`${environment.api}publish/list`);
  }

  listByUser(id) {
    return this.http.get(`${environment.api}publish/listByUser/${id}`);
  }

  getRequestByUser(id) {
    return this.http.get(`${environment.api}publish/getRequestByUser/${id}`);
  }

  addLike(id, body) {
    return this.http.put(`${environment.api}publish/addLike/${id}`, body);
  }

  addRequest(id, body) {
    return this.http.put(`${environment.api}publish/addRequest/${id}`, body);
  }

  addComment(id, body) {
    return this.http.put(`${environment.api}publish/addComment/${id}`, body);
  }
}
