import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  //user server
  private userUrl = 'http://localhost:8002/api/';
  private getUserMethod = 'getUser';
  private getUsersMethod = 'getUsers';
  private searchUser = 'searchUser';
  private getUsersPagingMethod = 'getUsersPaging';
  private addUserMethod = 'add';
  private updateUserMethod = 'update';
  private deleteUserMethod = 'delete';
  private countMethod = 'getCount';

  //file server
  private fileUrl = 'http://localhost:8005/';
  private uploadFileMethod = 'upload-file';

  //post server
  private postUrl = 'http://localhost:8004/api/post/questions/';
  private postInfoMethod = 'count';

  //search server
  private searchUrl = 'http://localhost:8001/api/search';

  getUser(user_id: string): Observable<any> {
    return this.http.post(this.userUrl + this.getUserMethod, {
      user_id: user_id,
    });
  }

  getUsers(lstUserIDs: string[]): Observable<any> {
    return this.http.post(this.userUrl + this.getUsersMethod, {
      lstIDs: lstUserIDs,
    });
  }

  getUsersPaging(page: number, isAdmin: boolean, searchName: string) {
    return this.http.post(this.userUrl + this.getUsersPagingMethod, {
      page: page,
      isAdmin: isAdmin,
      searchName: searchName,
    });
  }

  searchUsers(name: string) {
    return this.http.post(this.searchUrl, {
      name: name,
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
    return this.http.post(this.userUrl + this.addUserMethod, {
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

  updateUser(user: User): Observable<any> {
    return this.http.post(this.userUrl + this.updateUserMethod, user);
  }

  delete(user_id: string): Observable<any> {
    return this.http.post(this.userUrl + this.deleteUserMethod, {
      user_id: user_id,
    });
  }

  changeAvatar(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.fileUrl + this.uploadFileMethod, formData);
  }

  getUserPostInfo(user_id: string): Observable<any> {
    return this.http.post(this.postUrl + this.postInfoMethod, {
      user_id: user_id,
    });
  }

  getCount(): Observable<any> {
    return this.http.post(this.userUrl + this.countMethod, {});
  }
}
