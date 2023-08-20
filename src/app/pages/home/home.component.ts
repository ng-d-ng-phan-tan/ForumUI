import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QuestionsService } from 'src/app/modules/questions/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  questions: any;
  curPage = '1';

  constructor(
    private titleService: Title,
    private questionsService: QuestionsService
  ) {
    this.titleService.setTitle('Home - VietDevelop');
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
