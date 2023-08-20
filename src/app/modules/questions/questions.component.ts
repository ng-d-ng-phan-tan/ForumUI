import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QuestionsService } from './question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  questions: any;
  curPage = '1';

  constructor(
    private titleService: Title,
    private questionsService: QuestionsService
  ) {
    this.titleService.setTitle('Questions - VietDevelop');
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.questionsService.getQuestions().subscribe((result: any) => {
      this.questions = result.data;
    });
  }

  loadMore() {
    this.curPage = (+this.curPage + 1).toString();
    this.questionsService
      .getQuestions(this.curPage)
      .subscribe((result: any) => {
        this.questions = result.data;
      });
  }
}
