import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

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
}
