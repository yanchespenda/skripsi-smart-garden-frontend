// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  REQUEST_CREDENTIALS: true,

  COOKIES_SECURED: false,
  COOKIES_EXPIRED: 30 * 1000 * 60 * 60 * 24,

  baseUrl: 'http://127.0.0.1:3000/',

  FIREBASE_CONFIG: {
    apiKey: 'AIzaSyC72K2Q2yT0L5OrwLFB12hZYUUtNRjkvEU',
    authDomain: 'fb-mea.firebaseapp.com',
    databaseURL: 'https://fb-mea.firebaseio.com',
    projectId: 'fb-mea',
    storageBucket: 'fb-mea.appspot.com',
    messagingSenderId: '1071476535361',
    appId: '1:1071476535361:web:00b0f91555a0c99c2396c0'
  },

  FIREBASE_VAPID: 'BOawHeNCGRI3RfGHKjK1UHj9_KRmjTg2Oj2vQFQ0_uHsfZY6L1GSGnofKj0eq2vq3fe2oaYwdxFtcprls3fzpyc',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
