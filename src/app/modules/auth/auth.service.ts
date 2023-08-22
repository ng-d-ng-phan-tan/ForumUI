import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  //base URL của BE
  // private url = 'http://localhost:8080/api/auth';
  private url = 'http://localhost:8001/api';
  private device_token = '';

  receiveDeviceToken(data: any) {
    this.device_token = data;
  }

  getDeviceToken() {
    return this.device_token;
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/login', data /*, { headers } */);
  }

  logout(token: any): Observable<any> {
    const headers = new HttpHeaders({ Authorization: token });
    return this.http.get<any>(this.url + '/logout', { headers });
  }

  register(data: any): Observable<any> {
    // Có thể thêm các tùy chọn đối tượng HttpHeaders nếu cần thiết
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.url + '/register', data /*, { headers } */);
  }

  //gọi api getTokenPayLoad, api này có truyển trong header Key Authorization, value là token để backend xử lí token
  getTokenPayload(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.cookieService.get('access_token'),
    });
    // Gửi request với header chứa JWT token
    return this.http.get<any>(this.url + '/getTokenPayload', { headers });
  }

  changePassword(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/changePassword', data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/resetPassword', data);
  }

  registResetPassword(data: any): Observable<any> {
    return this.http.get<any>(this.url + `/registResetPassword?email=${data}`);
  }

  //Lấy role của user dựa vào token gửi tới BE
  getUserRole(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.cookieService.get('access_token'),
    });
    // Gửi request với header chứa JWT token
    return this.http.get<any>(this.url + '/getUserRole', { headers });
  }

  authenticateUser(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.cookieService.get('access_token'),
    });
    return this.http.get<any>(this.url + '/authenticateUser', { headers });
  }

  checkUserInRole(role: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.cookieService.get('access_token'),
    });
    // Gửi request với header chứa JWT token
    return this.http.get<any>(this.url + `/checkUserInRole?role=${role}`, {
      headers,
    });
  }

  activateAccount(email: any, activeCode: any): Observable<any> {
    return this.http.get<any>(
      this.url + `/activateAccount?email=${email}&activate=${activeCode}`
    );
  }

  reGenAccessToken(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/reGenAccessToken', data);
  }
}
