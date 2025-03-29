import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MomentsPage } from './moments.page';

const routes: Routes = [
  {
    path: '',
    component: MomentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MomentsPageRoutingModule {}
