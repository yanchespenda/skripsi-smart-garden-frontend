export const environment = {
  production: true,

  REQUEST_CREDENTIALS: true,

  COOKIES_SECURED: true,
  COOKIES_EXPIRED: 30 * 1000 * 60 * 60 * 24,

  baseUrl: 'https://api.skripsi.arproject.web.id/',

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
