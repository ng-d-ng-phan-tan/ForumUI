import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
  submitted = false;

  items = [
    { id: '2', name: 'Vue' },
    { id: '3', name: 'Nuxt' },
    { id: '4', name: 'Next' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.askQuestion = this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      body: [
        '',
        Validators.compose([Validators.required, Validators.minLength(20)]),
      ],
      tags: [
        [],
        Validators.compose([Validators.required]),
      ],
    });
  }

  get registerFormControl() {
    return this.askQuestion.controls;
  }

  requestAutocompleteItems = (text: string): Observable<any> => {
    // const url = `https://my.api.com/search?q=${text}`;
    // return this.http.get(url).map((data) => data.json());
    return of(this.items);
  };

  createQuestion() {
    this.submitted = true;
    if (this.askQuestion.valid) {
      alert(
        'Form Submitted succesfully!!!\n Check the values in browser console.'
      );
      console.table(this.askQuestion.value);
    }
  }
}
