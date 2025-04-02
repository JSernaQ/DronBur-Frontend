import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServerService {

  constructor(private http: HttpClient) { }

  async createUser(user: any) { 
    const data = this.http.post(`${environments.apiServerUrl}/user/createUser`, user)
    return data
  }

}
