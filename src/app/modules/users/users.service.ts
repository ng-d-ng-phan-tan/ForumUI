import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  //user server
  private userUrl = environment.USER_SERVICE_URL;
  private getUserMethod = 'getUser';
  private getUsersMethod = 'getUsers';
  private searchUserByNameMethod = 'searchUserByName';
  private getUsersPagingMethod = 'getUsersPaging';
  private addUserMethod = 'add';
  private updateUserMethod = 'update';
  private deleteUserMethod = 'delete';
  private countMethod = 'getCount';

  //file server
  private fileUrl = environment.NOTI_SERVICE_URL;
  private uploadFileMethod = 'upload-file';

  //post server
  private postUrl = environment.POST_SERVICE_URL;
  private postInfoMethod = 'count';

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

  searchUsers(name: string, page: number): Observable<any> {
    let limit = 15;
    return this.http.post(this.userUrl + this.searchUserByNameMethod, {
      name: name,
      offset: (page - 1) * limit + 1,
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

  getCount(isAdmin: boolean): Observable<any> {
    return this.http.post(this.userUrl + this.countMethod, {
      isAdmin: isAdmin,
    });
  }
}
