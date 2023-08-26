import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject<any>(null);

  constructor(private angularFireMessaging: AngularFireMessaging,
    private auth: AuthService,) {}

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe({
      next: (token) => {
        console.log(token);
        this.auth.receiveDeviceToken(token);
      },
      error: (err) => {
        console.error('Unable to get permission to notify.', err);
      },
    });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload: any) => {
      console.log('new message received. ', payload);
      this.currentMessage.next(payload);
    });
  }
}
