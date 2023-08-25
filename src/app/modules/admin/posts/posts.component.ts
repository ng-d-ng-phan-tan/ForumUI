import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { QuestionsService } from '../../questions/question.service';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';
import { UsersService } from '../../users/users.service';
import { toast } from 'src/assets/js/main.js';

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
  isUpdating = false;
  lstQuest: any[] = [];
  lstTmpQuest: any[] = [];

  dataImport: any = [];
  lstKey: any = [];

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

    const $modalElement: HTMLElement | null =
      document.querySelector('#modalEl');

    if ($modalElement) {
      const modalOptions: ModalOptions = {
        placement: 'center',
        backdrop: 'dynamic',
        backdropClasses:
          'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
          console.log('modal is hidden');
        },
        onShow: () => {
          console.log('modal is shown');
        },
        onToggle: () => {
          console.log('modal has been toggled');
        },
      };
      this.importFileModal = new Modal($modalElement, modalOptions);
    }
  }

  closeModalImportFile() {
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
    this.isUpdating = true;
    this.lstQuest = [];

    this.df.detectChanges();
    this.questionsService
      .adminGetQuestions(this.curPage.toString())
      .subscribe((result: any) => {
        this.isUpdating = false;
        this.curFilterApproveStt = '';
        this.curFilterReportStt = '';
        let lstUserID: any[] = [];
        this.lstQuest = result.data;
        console.log('get', this.lstQuest);

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
        // q.is_approved != false
        q.approved_at != null
      ) {
        return null;
      } else if (
        this.curFilterApproveStt == 'DENIED' &&
        q.is_approved != false
      ) {
        return null;
      }

      switch (this.curFilterReportStt) {
        case '': {
          return q;
        }
        case 'REPORTED': {
          if (q.isReported) {
            return q;
          }
          return null;
        }
        case 'NOT REPORTED': {
          if (q.isReported == false) {
            return q;
          }
          return null;
        }
      }
      return q;
    });
    this.df.detectChanges();
  }

  keyUpEvent(event: any) {
    if (event.key.toLowerCase() == 'enter') {
      this.searchPost();
    }
  }

  searchPostTitleOrBody(evt: any) {
    this.curSearchValue = evt.target.value;
    if (this.curSearchValue == '') {
      this.lstQuest = this.lstTmpQuest;
      this.lstTmpQuest = [];
      this.isSearching = false;
    }
  }

  searchPost() {
    this.isSearching = true;
    this.curFilterApproveStt = '';
    this.curFilterReportStt = '';

    if (this.curSearchValue != '') {
      //#region ElasticSearch
      this.questionsService
        .searchPostByTitleOrBody(this.curSearchValue, this.curSearchPage)
        .subscribe((res: any) => {
          if (res) {
            res.posts.forEach((quest: any) => {
              quest.isReported = quest.is_reported;
              quest.created_at = quest?.created_at?.$date;
            });
            this.lstTmpQuest = this.lstQuest;
            this.lstQuest = res.posts;
            this.searchCount = res.total;
            this.isSearching = false;
            console.log('search', this.lstQuest);

            if (this.lstQuest.length == 0) {
              toast('Failed', 'No post matches the given value', 'error', 3000);
              this.lstQuest = this.lstTmpQuest;
              this.lstTmpQuest = [];
            }
            this.df.detectChanges();
          } else {
            this.isSearching = false;
            this.lstTmpQuest = [];
            toast('Failed', 'No user matches the given value', 'error', 3000);
            this.df.detectChanges();
          }
        });
    } else {
      this.isSearching = false;
      this.lstTmpQuest = [];
      this.df.detectChanges();
    }
  }

  approve(quest: any) {
    this.isUpdating = true;
    this.adminService.approve(quest._id).subscribe((response: any) => {
      if (response.status == '201') {
        toast('Success', 'Updated', 'success', 3000);
        quest.is_approved = true;
      } else {
        toast('Failed', 'Update fail', 'error', 3000);
      }
      this.isUpdating = false;
      this.df.detectChanges();
    });
  }

  deny(quest: any) {
    this.isUpdating = true;
    this.adminService.deny(quest._id).subscribe((response: any) => {
      if (response.status == '201') {
        toast('Success', 'Denied', 'success', 3000);
        quest.is_approved = false;
        quest.approved_at = new Date();
      } else {
        toast('Failed', 'Update fail', 'error', 3000);
      }
      this.isUpdating = false;
      this.df.detectChanges();
    });
  }

  remove(quest: any) {
    this.isUpdating = true;
    this.questionsService.delete(quest._id).subscribe((response: any) => {
      if (response.status == '201') {
        toast('Success', 'Deleted', 'success', 3000);
        quest.is_approved = false;
        quest.deleted_at = new Date();
      } else {
        toast('Failed', 'Update fail', 'error', 3000);
      }
      this.isUpdating = false;
      this.df.detectChanges();
    });
  }
}
