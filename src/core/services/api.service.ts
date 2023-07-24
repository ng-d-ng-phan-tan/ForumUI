import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.API_URL; // Thay thế bằng URL thực tế của API của bạn

  constructor(private http: HttpClient) {}

  // Hàm gọi API để lấy dữ liệu
  getData(): Observable<any> {
    const url = `${this.apiUrl}/data`;
    return this.http.get<any>(url);
  }

  // Hàm gọi API để gửi dữ liệu
  postData(data: any): Observable<any> {
    const url = `${this.apiUrl}/data`;
    // Bạn có thể thêm các tùy chọn đối tượng HttpHeaders nếu cần thiết
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, data /*, { headers } */);
  }

  // Các phương thức khác cho các yêu cầu HTTP khác (PUT, DELETE, ...)
}
