import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.POST_SERVICE_URL}tags/`;
  }

  getTags() {
    return this.http.get<any>(this.apiUrl);
  }
}
