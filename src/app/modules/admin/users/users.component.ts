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
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  constructor(
    private userService: UsersService,
    private df: ChangeDetectorRef,
    private adminService: AdminService
  ) {}

  lstUsers: User[] = [];
  lstTmpUsers: User[] = [];
  isAdmin = true;
  curPage = 1;
  curSearchPage = 1;
  curSearchValue = '';
  curUser!: User | null;
  count = 0;
  searchCount = 0;
  loginUser!: User;

  dataImport : any = []
  lstKey: any = []
  
  //Modal
  delModal!: ModalInterface;
  importFileModal!: ModalInterface;

  //loading
  isLoading = true;
  isSearching = false;

  //Filter
  curFilterRole = '';
  curFilterStatus = '0' || '1' || '2';
  ngOnInit(): void {
    let userInfo = localStorage.getItem('loginUser');
    if (userInfo) {
      this.loginUser = JSON.parse(userInfo) as User;
    }
    this.getUsersPagination();

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
      this.curFilterRole = '';
      this.curFilterStatus = '0';
      this.lstUsers = [];
      this.userService
        .getUsersPaging(this.curPage, this.isAdmin, this.curSearchValue)
        .subscribe((res: any) => {
          if (res.status == '200') {
            this.lstUsers = res.data.data;
            this.lstTmpUsers = this.lstUsers;
            this.isLoading = false;
            this.userService.getCount(this.isAdmin).subscribe((res) => {
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

  goToSearchPage(isNextPage: boolean) {
    if (isNextPage) {
      this.curSearchPage += 1;
    } else {
      this.curSearchPage -= 1;
    }
    this.searchUsers();
  }

  openDelModal() {
    this.delModal.show();
  }

  closeModalImportFile(){
    this.importFileModal.hide();
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
  searchName(evt: any) {
    this.curSearchValue = evt.target.value;
    if (this.curSearchValue == '') {
      this.lstUsers = this.lstTmpUsers;
      this.lstTmpUsers = [];
      this.isSearching = false;
    }
  }

  keyUpEvent(event: any) {
    if (event.key.toLowerCase() == 'enter') {
      this.searchUsers();
    }
  }
  searchUsers() {
    this.isSearching = true;
    this.curFilterRole = '';
    this.curFilterStatus = '0';
    if (this.curSearchValue != '') {
      //#region ElasticSearch
      this.userService
        .searchUsers(this.curSearchValue, this.curSearchPage)
        .subscribe((res: any) => {
          if (res) {
            this.lstTmpUsers = this.lstUsers;
            this.lstUsers = res.users as User[];
            this.searchCount = res.total;
            this.isSearching = false;
            if (this.lstUsers.length == 0) {
              toast('Failed', 'No user matches the given name', 'error', 3000);
              this.lstUsers = this.lstTmpUsers;
              this.lstTmpUsers = [];
            }
            this.df.detectChanges();
          } else {
            this.isSearching = false;
            this.lstTmpUsers = [];
            toast('Failed', 'No user matches the given name', 'error', 3000);
            this.df.detectChanges();
          }
        });
    } else {
      this.isSearching = false;
      this.lstTmpUsers = [];
      this.df.detectChanges();
    }
  }

  export() {
    this.adminService.exportData(this.lstUsers, 'Sample');
  }

  async import(event: any) {
    debugger
    const file: File = event.target.files[0];
    if (file) {
      const extension = file.name.split('.').pop();
      if (extension === 'xlsx') {
        this.adminService.importData(file).then((res) => {
          this.dataImport = res;
          console.log('data import', this.dataImport);
           this.lstKey = Object.keys(this.dataImport[0]);
          
          // const checkboxElement = document.getElementById('my_modal_6');
          // if (checkboxElement instanceof HTMLInputElement) {
          //   checkboxElement.checked = true;
          // }

          this.importFileModal.show();
        });
      } else {
        alert('File không hợp lệ');
      }
    }
  }

  changeFilter(evt: any, type: string) {
    switch (type) {
      case 'role': {
        this.curFilterRole = evt.target?.value;
        break;
      }
      case 'status': {
        this.curFilterStatus = evt.target?.value;
        break;
      }
    }

    this.lstUsers = this.lstTmpUsers.filter((u) => {
      if (this.curFilterRole != '' && u.role != this.curFilterRole) {
        return null;
      }

      switch (this.curFilterStatus) {
        case '0': {
          return u;
        }
        case '1': {
          if (u.delete_at == null) {
            return u;
          }
          return null;
        }
        case '2': {
          if (u.delete_at != null) {
            return u;
          }
          return null;
        }
      }
      return u;
    });
  }
}
