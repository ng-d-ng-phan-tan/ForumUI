import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskComponent } from './ask/ask.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuestionsComponent } from './questions.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [AskComponent, QuestionsComponent, DetailComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
})
export class QuestionsModule {}
