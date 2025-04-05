import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'chats',
        loadChildren: () => import('../chats/chats-list/chats-list.module').then(m => m.ChatsListPageModule),
        canActivate: [authGuard]
      },
      {
        path: 'chats/:id',
        loadChildren: () => import('../chats/chat-room/chat-room.module').then(m => m.ChatRoomPageModule),
        canActivate: [authGuard]
      },
      {
        path: 'feed',
        loadChildren: () => import('../feed/feed.module').then(m => m.FeedPageModule),
        canActivate: [authGuard]
      },
      {
        path: 'moments',
        loadChildren: () => import('../moments/moments.module').then(m => m.MomentsPageModule),
        canActivate: [authGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [authGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/chats',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/chats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
