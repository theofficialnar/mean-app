import { Message } from './message.model';
import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
// unlock observable functions
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { ErrorService } from '../errors/error.service';

//adds some metadata so that injector is able to give services
@Injectable()

export class MessageService {
  private messages: Message[] = [];
  editMessageEvent = new EventEmitter<Message>();

  constructor (private http: Http, private errorService: ErrorService) {}
  
  //adds new message to the server
  addMessage (message: Message) {

    // convert data to JSON
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type' : 'application/json'});
    const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';

    //set up the observable
    return this.http
      .post(`https://nar-mean-app.herokuapp.com/message${token}`, body, {headers: headers})

      // extract data attached to response and converts to object
      .map((response: Response) => {

        //makes sure that newly added message has it's _id prop
        const result = response.json();
        const newMessage = new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id);
        this.messages.push(newMessage);
        return newMessage;
      })
      //allows to handle the error and show it in the front end
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  
  //gets all messages stored on the server
  getMessages () {
    return this.http.get('https://nar-mean-app.herokuapp.com/message')
      .map((response: Response) => {
        const messages = response.json().obj;

        //initiate array to store messages using the Message model
        let transformedMessages: Message[] = [];

        //loop through all messages from server
        for (let message of messages) {
          transformedMessages.push(new Message(message.content, message.user.firstName, message._id, message.user._id))
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  
  //passes the message to be edited to the input field
  editMessage (message: Message) {
    this.editMessageEvent.emit(message);
  }
  
  //updates the message on the server
  updateMessage (message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type' : 'application/json'});
    const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';
    return this.http
      .patch(`https://nar-mean-app.herokuapp.com/message/${message.messageId}${token}`, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  
  //deletes the message from the server
  deleteMessage (message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';
    return this.http
    .delete(`https://nar-mean-app.herokuapp.com/message/${message.messageId}${token}`)
    .map((response: Response) => response.json())
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }
}