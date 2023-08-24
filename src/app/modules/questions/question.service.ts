import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  apiUrl = '';
  answerUrl = '';
  adminUrl = '';
  constructor(private http: HttpClient) {
    this.answerUrl = environment.POST_SERVICE_URL + 'answers/';
    this.apiUrl = environment.POST_SERVICE_URL + 'questions'; //'http://localhost:8003/api';
    this.adminUrl = environment.ADMIN_POST_SERVICE_URL;
  }

  searchPostByTitleOrBody(value: string, page: number) {
    let limit = 20;

    return this.http.post(this.adminUrl + 'questions/searchPostByTitleOrBody', {
      search: value,
      offset: (page - 1) * limit + 1,
    });
  }

  getQuestion(question_id: string) {
    return this.http.get(this.apiUrl + '/' + question_id);
  }

  getQuestions(page: string = '1') {
    return this.http.get(this.apiUrl + '?page=' + page);
  }

  getQuestionCount() {
    return this.http.post(this.adminUrl + 'questions/getCount', {});
  }

  getAnswers(question_id: string) {
    // return this.http.get('http://localhost:8003/api/answers/' + question_id);
    return this.http.get(this.answerUrl + question_id);
  }

  createQuestion(data: any) {
    return this.http.post(this.apiUrl + '', data);
  }

  answer(data: any) {
    // return this.http.post('http://localhost:8003/api/answers', data);
    return this.http.post(this.answerUrl, data);
  }

  vote(question_id: string, data: any) {
    return this.http.post(this.apiUrl + '/vote/' + question_id, data);
  }

  report(question_id: string, data: any) {
    return this.http.post(this.apiUrl + '/report/' + question_id, data);
  }
}
