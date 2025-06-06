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
  // uid: String | undefined, content: String, images: String[], video: String[]
  async createPost(content: String) {

    // if (!uid) {
    //   console.warn('UID no definido');
    //   return null
    // }

    try {

      const newPost: any = {
        uid: '67ec9c4fdbc2496afdea77a9',
        content,
        images: 'Hola que tal',
        videos: 'Hola que tal'
      }

      const userInfo = await firstValueFrom(this.http.post(`${environments.apiServerUrl}/post/create`, newPost))
      return (userInfo as any).msg

    } catch (error) {
      console.error('Error al crear post:', error);
      return null
    }
    
  }

}
