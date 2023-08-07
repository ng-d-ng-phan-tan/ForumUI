import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Questions - VietDevelop');
  }
}
