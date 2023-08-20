import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from './services/api.service';
import { FormatDistancePipe } from './pipes/format-distance.pipe';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { MessagingService } from './services/messaging.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.development';

@NgModule({
  declarations: [FormatDistancePipe],
  imports: [
    HttpClientModule,
    CommonModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [ApiService, MessagingService, DatePipe, CookieService],
  exports: [FormatDistancePipe],
})
export class CoreModule {}
