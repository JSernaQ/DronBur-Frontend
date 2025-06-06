import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ApiServerService } from 'src/app/modules/auth/services/api-server.service';

@Component({
  selector: 'app-principal-feed-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.scss'],
  standalone: false
})
export class PrincipalPageComponent implements OnInit {

  user: any;
  friendsList: any[] = [];
  postsList: any[] = [];

  constructor(private api: ApiServerService) { }

  async ngOnInit() {

    const { value } = await Preferences.get({ key: 'user' });
    this.user = JSON.parse(value || '');
    this.friendsList = this.user.followed;

    await this.getFriendPosts();

  }

  getFriendPosts() {
    const fullList = [...this.friendsList, this.user._id];
    this.api.getFriendsPosts(fullList).subscribe((data) => {
      this.postsList = data.posts;
    });
  }

}
