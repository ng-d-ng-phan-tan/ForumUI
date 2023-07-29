import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8002/api/';
  private getUserMethod = 'getUser';
  private addUserMethod = 'add';
  private updateUserMethod = 'update';
  private deleteUserMethod = 'delete';

  private fileUrl = 'http://localhost:8005/api/';

  getUser(user_id: string): Observable<any> {
    return this.http.post(this.baseUrl + this.getUserMethod, {
      user_id: user_id,
    });
  }

  addUser(
    user_id: string,
    name: string,
    email: string,
    avatar: string,
    gender: boolean,
    date_of_birth: string,
    receive_notify_email: boolean,
    role: string
  ): Observable<any> {
    return this.http.post(this.baseUrl + this.addUserMethod, {
      user_id: user_id,
      name: name,
      email: email,
      avatar: avatar,
      gender: gender,
      date_of_birth: date_of_birth,
      receive_notify_email: receive_notify_email,
      role: role,
    });
  }

  updateUser(
    user_id: string,
    name: string,
    avatar: string,
    gender: boolean,
    date_of_birth: string,
    receive_notify_email: boolean,
    role: string
  ): Observable<any> {
    return this.http.post(this.baseUrl + this.updateUserMethod, {
      user_id: user_id,
      name: name,
      avatar: avatar,
      gender: gender,
      date_of_birth: date_of_birth,
      receive_notify_email: receive_notify_email,
      role: role,
    });
  }

  delete(user_id: string): Observable<any> {
    return this.http.post(this.baseUrl + this.deleteUserMethod, {
      user_id: user_id,
    });
  }
}
