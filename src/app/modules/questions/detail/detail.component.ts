import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionsService } from '../question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  Editor = ClassicEditor;
  question: any;
  question_id: string = '';

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionsService
  ) {
    this.route.params.subscribe((params) => {
      this.question_id = params['question_id'];
    });
  }

  ngOnInit(): void {
    this.getQuestion(this.question_id);
  }

  getQuestion(question_id: string) {
    this.questionsService.getQuestion(question_id).subscribe((result) => {
      this.question = result;
    });
  }
}
