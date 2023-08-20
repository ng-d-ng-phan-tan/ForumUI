import { Component, OnInit } from '@angular/core';
import { TagsService } from './tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  tags: any = [];

  constructor(private tagService: TagsService) {}

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    this.tagService.getTags().subscribe((result: any) => {
      this.tags = result.data;
    });
  }
}
