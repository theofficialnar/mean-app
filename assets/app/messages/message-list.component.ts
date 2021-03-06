import { Component, OnInit } from "@angular/core";
import { Message } from './message.model';
import { MessageService } from "./message.service";

@Component({
  selector: 'app-message-list',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <!-- message refers to the local variable set on *ngFor, * means structural directive -->
      <app-message
        [message-input-field]="message"        
        *ngFor="let message of messages">
      </app-message>
    </div> 
  `
})

export class MessageListComponent implements OnInit {
  messages: Message[];
  constructor (private messageService: MessageService) {}

  //executed once the component has been initialized by angular
  ngOnInit () {
    this.messageService
      .getMessages()
      .subscribe(
        //success callback
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  }
}