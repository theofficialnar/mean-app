import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})

export class MessageInputComponent implements OnInit{
  // loads the message to be edited to the input field if not null
  messageLoaded: Message;

  // allow angular to inject messageService
  constructor (private messageService: MessageService) {}

  onSubmit (form: NgForm) {

    //if this.message is not null input will be on edit mode, otherwise create new 
    if (this.messageLoaded) {
      //Edit
      this.messageLoaded.content = form.value.content;
      this.messageService
        .updateMessage(this.messageLoaded)
        .subscribe(
          result => console.log(result)
        );
      //empties the input field after submit
      this.messageLoaded = null

    } else {
      //Create
      const message = new Message(form.value.content, 'Nar');
      this.messageService
        .addMessage(message)
  
        //send the http request to angular and returns data
        .subscribe(
          data => console.log(data),
          error => console.error(error)
        );
    };    
    
    // resetForm() auto clears the input after submitting it
    form.resetForm();
  }

  onClear (form: NgForm) {
    form.resetForm();
    this.messageLoaded = null;
  }

  ngOnInit () {
    this.messageService.editMessageEvent.subscribe(
      (message: Message) => this.messageLoaded = message
    );
  }
}