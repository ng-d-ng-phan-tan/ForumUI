import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskComponent } from './ask/ask.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [AskComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
})
export class QuestionsModule {}
