import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  private url = 'http://127.0.0.1:8003/api';
  private device_token = '';

  getTags() {
    return this.http.get<any>(this.url + '/tags');
  }
}
