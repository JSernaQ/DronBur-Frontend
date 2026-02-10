import { Component, OnDestroy, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Subscription } from 'rxjs';
import { ApiServerService } from 'src/app/modules/auth/services/api-server.service';

@Component({
  selector: 'app-principal-feed-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.scss'],
  standalone: false
})
export class PrincipalPageComponent implements OnInit, OnDestroy {

  user: any;
  friendsList: any[] = [];
  postsList: any[] = [];
  private postSub?: Subscription;


constructor(private api: ApiServerService) { }

async ngOnInit() {
  
  const { value } = await Preferences.get({ key: 'user' });
  this.user = JSON.parse(value || '');
  this.friendsList = this.user.followed;
  
  await this.getFriendPosts();
  
  
}

getFriendPosts() {
  const fullList = [...this.friendsList, this.user._id];
  this.postSub = this.api.getFriendsPosts(fullList).subscribe((data) => {
    this.postsList = data.posts;
  });
}

ngOnDestroy(): void {
  this.postsList = [];
  this.friendsList = [];
  this.user = null;
  this.postSub?.unsubscribe();
}

}
