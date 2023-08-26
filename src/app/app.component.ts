import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { MessagingService } from './core/services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ForumUI';
  message: any;
  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    initFlowbite();
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}
