import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8003/api/tags/';
  }

  getTags() {
    return this.http.get<any>(this.apiUrl);
  }
}
