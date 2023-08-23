import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { QuestionsService } from '../../questions/question.service';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';

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

  dataImport : any = []
  lstKey: any = []

  importFileModal!: ModalInterface;

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
