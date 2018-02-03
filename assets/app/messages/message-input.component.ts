import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})

export class MessageInputComponent {
  // allow angular to inject messageService
  constructor (private messageService: MessageService) {}

  onSubmit (form: NgForm) {
    console.log(form);
    const message = new Message(form.value.content, 'Nar');
    this.messageService.addMessage(message);
    
    // resetForm() auto clears the input after submitting it
    form.resetForm();
  }
}