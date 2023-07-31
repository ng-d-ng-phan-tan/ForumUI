import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { FormatDistancePipe } from './pipes/format-distance.pipe';

@NgModule({
  declarations: [
    FormatDistancePipe
  ],
  imports: [CommonModule],
  providers: [ApiService],
})
export class CoreModule {}
