import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject('apiURL') apiURL: string) {
    this.apiUrl = apiURL;
  }

  // Hàm gọi API để lấy dữ liệu
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Hàm gọi API để gửi dữ liệu
  postData(data: any): Observable<any> {
    // Bạn có thể thêm các tùy chọn đối tượng HttpHeaders nếu cần thiết
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, data /*, { headers } */);
  }

  // Các phương thức khác cho các yêu cầu HTTP khác (PUT, DELETE, ...)
}
