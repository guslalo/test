importScripts('https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.17.2/firebase-messaging.js');
firebase.initializeApp({
  apiKey: 'AIzaSyCWaT74uwjxYvlWuv-j8UnKozTNtRM-6sY',
  authDomain: 'itms-d242b.firebaseapp.com',
  databaseURL: 'https://itms-d242b.firebaseio.com',
  projectId: 'itms-d242b',
  storageBucket: 'itms-d242b.appspot.com',
  messagingSenderId: '976429325991',
  appId: '1:976429325991:web:102ef2f452b0bc15ac8582',
  measurementId: 'G-FJ3Z5E7CRC',
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

