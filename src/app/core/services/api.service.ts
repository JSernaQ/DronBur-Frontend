import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user !: any;

  constructor(private http: HttpClient) { }

  async getUser(uid: String | undefined) {

    if (!uid) {
      console.warn('UID no definido');
      return null
    }

    try {
      const userInfo = await firstValueFrom(this.http.get(`${environments.apiServerUrl}/user/${uid}`));
      return (userInfo as any).userInfo

    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return null
    }
  }

}
