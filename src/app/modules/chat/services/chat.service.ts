import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environments } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io(`${environments.socketServerUrl}`)

  constructor(private http: HttpClient) {}

  initializeSocket(userId: string) {
    if (!userId) {
      console.warn('No se pudo conectar al socket: usuario no definido');
      return;
    }
    
    this.socket = io(`${environments.socketServerUrl}`);
  
    this.socket.on('connect', () => {
      console.log('Socket conectado:', this.socket.id);
      this.socket.emit('join', userId); 
    });
  
    this.socket.on('disconnect', () => {
      console.log('Socket desconectado');
    });
  };

  joinChat(chatId: string){
    this.socket.emit('joinChat', chatId);
  }  

  getChats(userId: string){
    return this.http.get(`${environments.apiServerUrl}/chat/${userId}`);
  };

  getMessages(chatId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environments.apiServerUrl}/message/${chatId}`);
  };

  sendMessage(chatId: string, sender: string, content: string) {
    this.socket.emit('sendMessage', { chatId, sender, content, type: 'text' });
  };

  listenNewMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newMessage', message => {
        observer.next(message);
      });
    });
  };

  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Socket desconectado');
    }
  }
  

}


