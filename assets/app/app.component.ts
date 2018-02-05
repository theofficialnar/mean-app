import { Component, OnInit } from '@angular/core';
import { Message } from './messages/message.model';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  // providers - allows angular to pass the service to the constructor, placed here to provide one single instance for all shared components
  providers: [MessageService]
})

export class AppComponent{
  
}