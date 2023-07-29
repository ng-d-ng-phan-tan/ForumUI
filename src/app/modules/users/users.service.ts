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
    return this.http.post(this.baseUrl + this.getUserMethod, user_id);
  }
}
