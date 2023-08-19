import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UsersService } from '../../users/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';
import { toast } from 'src/assets/js/main.js';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  constructor(
    private userService: UsersService,
    private df: ChangeDetectorRef
  ) {}

  lstUsers: User[] = [];
  isAdmin = true;
  curPage = 1;
  curSearchValue = '';
  isLoading = true;
  curUser!: User | null;
  count = 0;

  //Modal
  delModal!: ModalInterface;

  ngOnInit(): void {
    this.getUsersPagination();
  }

  ngAfterViewInit() {
    let delModalEle = document.getElementById('delModal');
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
    this.delModal = new Modal(delModalEle, modalOptions);
  }

  getUsersPagination() {
    if (this.curPage > 0) {
      this.isLoading = true;
      this.lstUsers = [];
      this.userService
        .getUsersPaging(this.curPage, this.isAdmin, this.curSearchValue)
        .subscribe((res: any) => {
          if (res.status == '200') {
            this.lstUsers = res.data.data;
            this.isLoading = false;
            this.userService.getCount().subscribe((res) => {
              if (res.status == '200') {
                this.count = res.data;
              }
            });
            this.df.detectChanges();
          }
        });
      this.df.detectChanges();
    }
  }

  goToPage(isNextPage: boolean) {
    if (isNextPage) {
      this.curPage += 1;
    } else {
      this.curPage -= 1;
    }
    this.getUsersPagination();
  }

  openDelModal() {
    this.delModal.show();
  }

  closeDelModal(confirmDel: boolean) {
    if (confirmDel) {
      this.isLoading = true;
      if (this.curUser) {
        this.userService.delete(this.curUser.user_id).subscribe((res) => {
          this.isLoading = false;
          if (res.status == '200') {
            if (this.curUser) {
              this.curUser.delete_at = new Date();
            }
            toast('Success', 'Deleted', 'success', 3000);
            this.delModal.hide();
          } else {
            toast('Failed', 'Unknow Error', 'error', 3000);
            this.delModal.hide();
          }
        });
        this.df.detectChanges();
      }
    } else {
      this.delModal.hide();
    }
  }

  clickUser(user: User) {
    if (user) {
      this.curUser = user;
    }
  }

  viewProfile(user: User) {
    window.location.href += '/' + user.user_id;
  }
}
