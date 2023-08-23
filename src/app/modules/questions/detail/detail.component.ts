import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionsService } from '../question.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  Editor = ClassicEditor;
  question: any;
  answers: any = [];
  question_id: string = '';
  isLoading = true;
  answerQuestion!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questionsService: QuestionsService,
    private usersService: UsersService
  ) {
    this.route.params.subscribe((params) => {
      this.question_id = params['question_id'];
    });
  }

  ngOnInit(): void {
    this.answerQuestion = this.fb.group({
      answer: [
        '',
        Validators.compose([Validators.required, Validators.minLength(20)]),
      ],
      question_id: '',
      user_id: '',
    });
    this.getQuestion(this.question_id);
    this.getAwnswer(this.question_id);
  }

  get registerFormControl() {
    return this.answerQuestion.controls;
  }

  getQuestion(question_id: string) {
    this.questionsService.getQuestion(question_id).subscribe((result) => {
      this.question = result;
      this.usersService
        .getUser(this.question.questioner_id)
        .subscribe((res: any) => {
          if (res.status === '200') {
            let user = res.data;
            this.question = {
              ...this.question,
              user,
            };
          }
        });
    });
  }

  getAwnswer(question_id: string) {
    this.questionsService.getAnswers(question_id).subscribe((result: any) => {
      let lstUserID: any[] = [];
      this.answers = result.data;
      this.answers.map((answer: any) => {
        lstUserID.push(answer.user_id);
      });
      let users = [];
      this.usersService.getUsers(lstUserID).subscribe((res: any) => {
        if (res.status === '200') {
          users = res.data;

          let result = [];

          for (const answer of this.answers) {
            let user = users.filter((user: any) => {
              return answer.user_id === user.user_id;
            });
            const answerWithUser = {
              ...answer,
              user,
            };
            result.push(answerWithUser);
          }

          this.answers = result;
        }
      });
      this.isLoading = false;
    });
  }

  answer() {
    this.submitted = true;
    if (this.answerQuestion.valid) {
      const loginUser = JSON.parse(localStorage.getItem('loginUser') as string);
      this.answerQuestion.patchValue({ user_id: loginUser.user_id });
      this.answerQuestion.patchValue({ question_id: this.question_id });
      this.questionsService
        .answer(this.answerQuestion.value)
        .subscribe((res) => {});
    }
  }

  vote() {
    const loginUser = JSON.parse(localStorage.getItem('loginUser') as string);
    this.questionsService
      .vote(this.question_id, {
        type: '1',
        created_by: loginUser.user_id,
        created_at: Date.now().toString(),
      })
      .subscribe();
  }

  downvote() {
    const loginUser = JSON.parse(localStorage.getItem('loginUser') as string);
    this.questionsService
      .vote(this.question_id, {
        type: '2',
        created_by: loginUser.user_id,
        created_at: Date.now().toString(),
      })
      .subscribe();
  }
}
