import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QuestionsService } from 'src/app/modules/questions/question.service';
import { UsersService } from 'src/app/modules/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  questions: any;
  curPage = '1';
  isSearching = true;
  isLoading = true;

  constructor(
    private titleService: Title,
    private questionsService: QuestionsService,
    private usersService: UsersService
  ) {
    this.titleService.setTitle('Home - VietDevelop');
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.questionsService.getQuestions().subscribe((result: any) => {
      let lstUserID: any[] = [];
      this.questions = result.data;
      this.questions.map((question: any) => {
        lstUserID.push(question.questioner_id);
      });
      let users = [];
      this.usersService.getUsers(lstUserID).subscribe((res: any) => {
        if (res.status === '200') {
          users = res.data;

          let result = [];

          for (const question of this.questions) {
            let user = users.filter((user: any) => {
              return question.questioner_id === user.user_id;
            });
            const questionWithUser = {
              ...question,
              user,
            };
            result.push(questionWithUser);
          }

          this.questions = result;
        }
        this.isLoading = false;
      });
    });
  }

  loadMore() {
    this.isLoading = true;
    this.curPage = (+this.curPage + 1).toString();
    this.questionsService
      .getQuestions(this.curPage)
      .subscribe((result: any) => {
        let lstUserID: any[] = [];
        this.questions = result.data;
        this.questions.map((question: any) => {
          lstUserID.push(question.questioner_id);
        });
        let users = [];
        this.usersService.getUsers(lstUserID).subscribe((res: any) => {
          if (res.status === '200') {
            users = res.data;

            let result = [];

            for (const question of this.questions) {
              let user = users.filter((user: any) => {
                return question.questioner_id === user.user_id;
              });
              const questionWithUser = {
                ...question,
                user,
              };
              result.push(questionWithUser);
            }

            this.questions = result;
          }
          this.isLoading = false;
        });
      });
  }
}
