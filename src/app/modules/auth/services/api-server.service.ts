import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServerService {

  constructor(private http: HttpClient) { }

  createUser(user: any) {
    return this.http.post(`${environments.apiServerUrl}/user/createUser`, user);
  }

  getUser(uid: any): Observable<any> {
    return this.http.get(`${environments.apiServerUrl}/user/${uid}`);
  }

  getChatInfo(chatId: any): Observable<any> {
    return this.http.get(`${environments.apiServerUrl}/chat/individual/${chatId}`);
  }

  getPostsByUser(info: any[]): Observable<any> {
    return this.http.post(`${environments.apiServerUrl}/post//get-posts-by-user/`, info);
  }

  getFriendsPosts(friendsList: any[]): Observable<any> {
    return this.http.post(`${environments.apiServerUrl}/post/get-friends-posts/`, {
      uidList: friendsList
    });
  }

}
