import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent implements OnInit {
  Editor = ClassicEditor;
  askQuestion!: FormGroup;
  itemsAsObjects = [];

  items = [
    { id: '2', name: 'Vue' },
    { id: '3', name: 'Nuxt' },
    { id: '4', name: 'Next' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.askQuestion = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
      ],
      body: '',
      tags: false,
    });
  }

  get title() {
    return this.askQuestion.get('title');
  }

  requestAutocompleteItems = (text: string): Observable<any> => {
    // const url = `https://my.api.com/search?q=${text}`;
    // return this.http.get(url).map((data) => data.json());
    return of(this.items);
  };

  createQuestion() {
    
  }
}
