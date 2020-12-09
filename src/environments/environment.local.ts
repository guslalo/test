export const environment = {
  production: false,
  defaultLang: 'pt',
  checkAge: false,
  title: 'Itms | Teleconsulta',
  baseUrl: 'http://192.168.0.156:3000/api/', //https://backend.homeclinic.telemedicina.com/api/
  client: 'itms',
  jitsi: 'meet.bdot.app', //meet.bdot.app
  apiKey: '',
  clientSecret: '',
  photoUrlBase: 'https://itms-dev.s3-sa-east-1.amazonaws.com/',
  sessionTime: 1200,
  firebase: {
    apiKey: 'AIzaSyCWaT74uwjxYvlWuv-j8UnKozTNtRM-6sY',
    authDomain: 'itms-d242b.firebaseapp.com',
    databaseURL: 'https://itms-d242b.firebaseio.com',
    projectId: 'itms-d242b',
    storageBucket: 'itms-d242b.appspot.com',
    messagingSenderId: '976429325991',
    appId: '1:976429325991:web:102ef2f452b0bc15ac8582',
    measurementId: 'G-FJ3Z5E7CRC',
  },
  ttlSession: 20000 * 60,
  setup: 'CL',
  version: '{BUILD_VERSION}'
};
