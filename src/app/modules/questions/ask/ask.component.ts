import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  Editor = ClassicEditor;
  askQuestion = new FormGroup({
    title: new FormControl(''), // <== default value
    body: new FormControl(''), // <== default value
    tags: new FormControl(''), // <== default value
  });

  constructor() {}

  ngOnInit(): void {}
}
