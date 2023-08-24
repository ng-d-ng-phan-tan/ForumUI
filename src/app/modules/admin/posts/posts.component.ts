import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { QuestionsService } from '../../questions/question.service';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private questionsService: QuestionsService,
    private usersService: UsersService,
    private df: ChangeDetectorRef
  ) {}
  isSearching = false;
  lstQuest: any[] = [];
  lstTmpQuest: any[] = [];

  dataImport : any = []
  lstKey: any = []

  importFileModal!: ModalInterface;

  curPage = 1;
  curSearchPage = 1;
  curSearchValue = '';
  count = 0;
  searchCount = 0;
  curFilterApproveStt = '';
  curFilterReportStt = '';
  ngOnInit(): void {
    this.getQuestionPaging();

    const $modalElement: HTMLElement | null = document.querySelector('#modalEl');

    if ($modalElement) {
      const modalOptions: ModalOptions = {
        placement: 'center',
        backdrop: 'dynamic',
        backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
            console.log('modal is hidden');
        },
        onShow: () => {
            console.log('modal is shown');
        },
        onToggle: () => {
            console.log('modal has been toggled');
        }
      }
      this.importFileModal = new Modal($modalElement, modalOptions);
  }
  }

  closeModalImportFile(){
    this.importFileModal.hide();
  }

  async import(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const extension = file.name.split('.').pop();
      if (extension === 'xlsx') {
        this.adminService.importData(file).then((res) => {
          this.dataImport = res;
          console.log('data import', this.dataImport);
           this.lstKey = Object.keys(this.dataImport[0]);
          this.importFileModal.show();
        });
      } else {
        alert('File không hợp lệ');
      }
    }
  }

  export() {
    this.adminService.exportData(this.lstQuest, 'Sample');
  }

  getQuestionPaging() {
    this.questionsService
      .getQuestions(this.curPage.toString())
      .subscribe((result: any) => {
        this.curFilterApproveStt = '';
        this.curFilterReportStt = '';
        let lstUserID: any[] = [];
        this.lstQuest = result.data;
        this.lstQuest.map((question: any) => {
          lstUserID.push(question.questioner_id);
        });
        let users = [];
        this.usersService.getUsers(lstUserID).subscribe((res: any) => {
          if (res.status === '200') {
            users = res.data;

            let result = [];

            for (const question of this.lstQuest) {
              let user = users.filter((user: any) => {
                return question.questioner_id === user.user_id;
              });
              const questionWithUser = {
                ...question,
                user,
              };
              result.push(questionWithUser);
            }

            this.questionsService.getQuestionCount().subscribe((res: any) => {
              // console.log(res);
              if (res.status == '200') {
                this.count = res.data;
                this.df.detectChanges();
              }
            });
            this.lstQuest = result;
            this.lstTmpQuest = result;
            this.df.detectChanges();
          }
        });
      });
  }
  searchPost() {}

  goToPage(isNextPage: boolean) {
    if (isNextPage) {
      this.curPage += 1;
    } else {
      this.curPage -= 1;
    }
    this.getQuestionPaging();
  }

  goToSearchPage(isNextPage: boolean) {
    if (isNextPage) {
      this.curSearchPage += 1;
    } else {
      this.curSearchPage -= 1;
    }
    this.searchPost();
  }

  changeFilter(evt: any, type: string) {
    switch (type) {
      case 'approve': {
        this.curFilterApproveStt = evt.target?.value;
        break;
      }
      case 'report': {
        this.curFilterReportStt = evt.target?.value;
        break;
      }
    }
    this.lstQuest = this.lstTmpQuest.filter((q) => {
      if (this.curFilterApproveStt == 'APPROVED' && q.is_approved != true) {
        return null;
      } else if (
        this.curFilterApproveStt == 'PENDING' &&
        q.is_approved != false
      ) {
        return null;
      } else if (
        this.curFilterApproveStt == 'DENIED' &&
        q.is_approved != null
      ) {
        return null;
      }

      switch (this.curFilterReportStt) {
        case '': {
          return q;
        }
        case 'REPORTED': {
          if (q.is_reported) {
            return q;
          }
          return null;
        }
        case 'NOT REPORTED': {
          if (q.is_reported == false) {
            return q;
          }
          return null;
        }
      }
      return q;
    });
    this.df.detectChanges();
  }
}
