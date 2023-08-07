import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }
  //base URL của BE
  private url = 'http://127.0.0.1:8000/api';

  //Token gán cứng để thử truyền token qua header của request
  private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjkwMzgwMDg2LCJleHAiOjE2OTA1OTYwODYsIm5iZiI6MTY5MDM4MDA4NiwianRpIjoiTGhlZzZyTkFBZHlJdHlGTSIsInN1YiI6IjliMzMwNWExLTBkNGQtNDdjNy05N2NlLTNmZmI1ZmY2YWFhYSIsInBydiI6ImJjOTNhNWNmZThjOWYzNWFkOWQzODI0MDQwOWNkMTY1Y2U2ZWZjMGIiLCJ1c2VyX2lkIjoiOWIzMzA1YTEtMGQ0ZC00N2M3LTk3Y2UtM2ZmYjVmZjZhYWFhIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IlF1YW5nIEhpZXAiLCJlbWFpbCI6InZ1aGllcDJAZ21haWwuY29tIn0.FflIle2E_bq88yZ7mCG6Fx_nXmsUeX8B7hh0tqoJ4E4';

  login(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/login', data /*, { headers } */);
  }

  register(data: any): Observable<any> {
    // Có thể thêm các tùy chọn đối tượng HttpHeaders nếu cần thiết
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.url + '/register', data /*, { headers } */);
  }

  //gọi api getTokenPayLoad, api này có truyển trong header Key Authorization, value là token để backend xử lí token
  getTokenPayload(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': this.token });
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
    const headers = new HttpHeaders({ 'Authorization': this.token });
    // Gửi request với header chứa JWT token
    return this.http.get<any>(this.url + '/getUserRole', { headers });
  }

  checkUserInRole(role: any): Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': this.token });
    // Gửi request với header chứa JWT token
    return this.http.get<any>(this.url + `/checkUserInRole?role=${role}`, { headers });
  }

  activateAccount(email: any, activeCode: any): Observable<any>{
    return this.http.get<any>(this.url + `/activateAccount?email=${email}&activate=${activeCode}`);
  }
}
