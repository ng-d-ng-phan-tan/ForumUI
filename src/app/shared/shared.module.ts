import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './components/tag/tag.component';
import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [RichTextEditorComponent, TagComponent],
  imports: [CommonModule, CKEditorModule],
  exports: [RichTextEditorComponent, TagComponent],
})
export class SharedModule {}
