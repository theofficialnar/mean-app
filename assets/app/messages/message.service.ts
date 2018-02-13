import { Message } from './message.model';
import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
// unlock observable functions
import 'rxjs/Rx';
import { Observable } from 'rxjs';

//adds some metadata so that injector is able to give services
@Injectable()

export class MessageService {
  private messages: Message[] = [];
  editMessageEvent = new EventEmitter<Message>();

  constructor (private http: Http) {}
  
  //adds new message to the server
  addMessage (message: Message) {

    // convert data to JSON
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type' : 'application/json'});

    //set up the observable
    return this.http
      .post('http://localhost:3000/message', body, {headers: headers})

      // extract data attached to response and converts to object
      .map((response: Response) => {

        //makes sure that newly added message has it's _id prop
        const result = response.json();
        const newMessage = new Message(result.obj.content, 'Dummy Name', result.obj._id, null);
        this.messages.push(newMessage);
        return newMessage;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }
  
  //gets all messages stored on the server
  getMessages () {
    return this.http.get('http://localhost:3000/message')
      .map((response: Response) => {
        const messages = response.json().obj;

        //initiate array to store messages using the Message model
        let transformedMessages: Message[] = [];

        //loop through all messages from server
        for (let message of messages) {
          transformedMessages.push(new Message(message.content, 'Dummy Name', message._id, null))
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }
  
  //passes the message to be edited to the input field
  editMessage (message: Message) {
    this.editMessageEvent.emit(message);
  }
  
  //updates the message on the server
  updateMessage (message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http
      .patch(`http://localhost:3000/message/${message.messageId}`, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteMessage (message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
  }
}