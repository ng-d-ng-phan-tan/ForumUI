import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskComponent } from './ask/ask.component';
import { QuestionsComponent } from './questions.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuardUser } from 'src/app/core/guards/authuser.guard';

const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent,
  },
  {
    path: 'ask',
    canActivate: [AuthGuardUser],
    component: AskComponent,
  },
  {
    path: ':question_id',
    component: DetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
