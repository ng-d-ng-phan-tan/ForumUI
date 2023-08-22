import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { QuestionsService } from '../../questions/question.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private questionService: QuestionsService,
    private df: ChangeDetectorRef
  ) {}
  isSearching = false;
  lstQuest: any[] = [];
  lstTmpQuest: any[] = [];

  ngOnInit(): void {
    this.getQuestionPaging();
  }

  async import(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const extension = file.name.split('.').pop();
      if (extension === 'xlsx') {
        this.adminService.importData(file);
      } else {
        alert('File không hợp lệ');
      }
    }
  }

  export() {
    const data: any[] = [];
    this.adminService.exportData(data, 'Sample');
  }

  getQuestionPaging() {
    this.questionService.getQuestions().subscribe((res: any) => {
      if (res.data) {
        this.lstQuest = res.data;
        this.lstTmpQuest = res.data;
        this.df.detectChanges();
        console.log('lstquest', this.lstQuest);
      }
    });
  }
  searchPost() {}
}
