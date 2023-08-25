import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable, of } from 'rxjs';
import { TagsService } from '../../tags/tags.service';
import { QuestionsService } from '../question.service';
import { Router } from '@angular/router';

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
  items = [];
  loadingSomething = false;

  constructor(
    private titleService: Title,
    private router: Router,
    private fb: FormBuilder,
    private questionsService: QuestionsService,
    private tagsService: TagsService
  ) {
    this.titleService.setTitle('Ask question - VietDevelop');
  }

  ngOnInit(): void {
    this.askQuestion = this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      body: [
        '',
        Validators.compose([Validators.required, Validators.minLength(20)]),
      ],
      tags: [[], Validators.compose([Validators.required])],
      questioner_id: '',
    });

    this.tagsService.getTags().subscribe((result) => {
      this.items = result.data;
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
    this.loadingSomething = true;
    this.submitted = true;
    if (this.askQuestion.valid) {
      const loginUser = JSON.parse(localStorage.getItem('loginUser') as string);
      this.askQuestion.patchValue({ questioner_id: loginUser.user_id });
      this.questionsService
        .createQuestion(this.askQuestion.value)
        .subscribe((res: any) => {
          this.loadingSomething = false;
          if (res.status === 201) {
            this.router.navigate([`questions/${res.data._id}`]);
          }
        });
    }
  }
}
