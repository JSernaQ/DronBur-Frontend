import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environments } from './environments/environment';

import { initializeApp } from 'firebase/app';

if (environments.firebaseConfig) {
  initializeApp(environments.firebaseConfig);
}

if (environments.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));