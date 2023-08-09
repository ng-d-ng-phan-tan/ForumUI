import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskComponent } from './ask/ask.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionsComponent } from './questions.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AskComponent, QuestionsComponent, DetailComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class QuestionsModule {}
