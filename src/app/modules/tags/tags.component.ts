import { Component, OnInit } from '@angular/core';
import { TagsService } from './tags.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  tags: any = [];

  constructor(private titleService: Title, private tagService: TagsService) {
    this.titleService.setTitle('Tags - VietDevelop');
  }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    this.tagService.getTags().subscribe((result: any) => {
      this.tags = result.data;
    });
  }
}
