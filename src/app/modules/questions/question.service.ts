import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  baseUrl = '';
  apiUrl = '';
  constructor(private http: HttpClient) {
    this.baseUrl = environment.POST_SERVICE_URL;
    this.apiUrl = `${this.baseUrl}questions`;
  }

  getQuestion(question_id: string) {
    return this.http.get(this.apiUrl + '/' + question_id);
  }

  getQuestions(page: string = '1') {
    return this.http.get(this.apiUrl + '?page=' + page);
  }

  getQuestionCount() {
    return this.http.post(
      `${this.baseUrl}admin/questions/getCount`,
      {}
    );
  }

  getAnswers(question_id: string) {
    return this.http.get(`${this.baseUrl}answers/` + question_id);
  }

  createQuestion(data: any) {
    return this.http.post(this.apiUrl + '', data);
  }

  answer(data: any) {
    return this.http.post(`${this.baseUrl}answers`, data);
  }

  vote(question_id: string, data: any) {
    return this.http.post(this.apiUrl + '/vote/' + question_id, data);
  }

  report(question_id: string, data: any) {
    return this.http.post(this.apiUrl + '/report/' + question_id, data);
  }
}
