importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyCWaT74uwjxYvlWuv-j8UnKozTNtRM-6sY",
    authDomain: "itms-d242b.firebaseapp.com",
    databaseURL: "https://itms-d242b.firebaseio.com",
    projectId: "itms-d242b",
  	storageBucket: "itms-d242b.appspot.com",
    messagingSenderId: "976429325991",
    appId: "1:976429325991:web:102ef2f452b0bc15ac8582",
    measurementId: "G-FJ3Z5E7CRC"
    
  });

const messaging = firebase.messaging();