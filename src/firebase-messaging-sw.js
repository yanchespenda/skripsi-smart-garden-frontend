// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
  apiKey: 'AIzaSyC72K2Q2yT0L5OrwLFB12hZYUUtNRjkvEU',
  authDomain: 'fb-mea.firebaseapp.com',
  databaseURL: 'https://fb-mea.firebaseio.com',
  projectId: 'fb-mea',
  storageBucket: 'fb-mea.appspot.com',
  messagingSenderId: '1071476535361',
  appId: '1:1071476535361:web:00b0f91555a0c99c2396c0'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message handler', payload)
  const { title, body } = payload.data;
  const notificationTitle = title;
  const notificationOptions = {
    body: body,
  }
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload)
  const { title, body } = payload.data;
  const notificationTitle = title;
  const notificationOptions = {
    body: body,
  }

  return self.registration.showNotification(notificationTitle, notificationOptions)
})
