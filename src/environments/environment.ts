import { FirebaseOptions } from '@angular/fire/app';

export interface EnvironmentConfig {
  production: boolean;
  firebase: FirebaseOptions;
}

export const environment: EnvironmentConfig = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyDL32WF5QzgFnjCggZDmJkHneiUPWUd4hI',
    authDomain: 'taskflow-c597d.firebaseapp.com',
    projectId: 'taskflow-c597d',
    storageBucket: 'taskflow-c597d.appspot.com',
    messagingSenderId: '505490247358',
    appId: '1:505490247358:web:df9ddbc1c78040c255d8ef',
    measurementId: 'G-90R9H095LY',
  },
};
