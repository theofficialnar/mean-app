import { Component, Input } from '@angular/core';

import { Message } from './message.model';
import { MessageService } from './message.service';

@Component ({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [`
    .author {
      display: inline-block;
      font-style: italic;
      font-size: 12px;
      width: 80%;
    }
    .config {
      display: inline-block;
      text-align: right;
      font-size: 12px;
      width: 19%;
    }
  `]
})

export class MessageComponent{
  // message: Message = new Message('content', 'some person');
  @Input ('message-input-field') message: Message;
  // @Output () editClicked = new EventEmitter<string>();
  
  constructor (private messageService: MessageService) {}

  color = 'red';
  
  onEdit () {
    // this.editClicked.emit('A new value');
    this.messageService.editMessage(this.message);
  }

  onDelete () {
    this.messageService
      .deleteMessage(this.message)
      .subscribe(
        result => console.log(result)
      );
  }
  
  //shows the edit / delete button if this function returns true
  belongsToUser () {
    return localStorage.getItem('userId') == this.message.userId;
  }
}