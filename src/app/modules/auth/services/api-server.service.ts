import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServerService {

  constructor(private http: HttpClient) { }

  async createUser(user: any) {
    const data = this.http.post(`${environments.apiServerUrl}/user/createUser`, user);
    return data
  }

  getUser(uid: any): Observable<any> {
    const data = this.http.get(`${environments.apiServerUrl}/user/${uid}`)
    return data
  }

  getChatInfo(chatId: any): Observable<any> {
    const data = this.http.get(`${environments.apiServerUrl}/chat/individual/${chatId}`)
    return data
  }

}
