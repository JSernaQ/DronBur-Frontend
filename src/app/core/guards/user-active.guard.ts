import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const userActiveGuard: CanActivateFn = (route, state) => {

  const afAuth = inject(AngularFireAuth);
  const router = inject(Router);

  return afAuth.authState.pipe(
    map(user => {
      if (user) {
        router.navigate(['/main/tabs/tab1']);
        return false;
      } else {
        return true;
      }
    }

    )
  )

};
