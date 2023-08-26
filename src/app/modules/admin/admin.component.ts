import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions/question.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users_qty = 0;
  questions_qty = 0;

  constructor(
    private questionsService: QuestionsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.questionsService.getQuestionCount().subscribe((res: any) => {
      if (res.status == '200') {
        this.questions_qty = res.data;
      }
    });

    this.usersService.getCount(true).subscribe((res) => {
      if (res.status == '200') {
        this.users_qty = res.data;
      }
    });
  }
}
