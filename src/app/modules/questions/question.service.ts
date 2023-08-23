import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  apiUrl = '';
  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8003/api/questions';
  }

  getQuestion(question_id: string) {
    return this.http.get(this.apiUrl + '/' + question_id);
  }

  getQuestions(page: string = '1') {
    return this.http.get(this.apiUrl + '?page=' + page);
  }

  getAnswers(question_id: string) {
    return this.http.get('http://localhost:8003/api/answers/' + question_id);
  }

  createQuestion(data: any) {
    return this.http.post(this.apiUrl + '', data);
  }

  answer(data: any) {
    return this.http.post('http://localhost:8003/api/answers', data);
  }

  vote(question_id: string, data: any) {
    return this.http.post(this.apiUrl + '/vote/' + question_id, data);
  }
}
