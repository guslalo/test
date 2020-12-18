export const environment = {
  production: true,
  defaultLang: 'pt',
  checkAge: false,
  title: 'Itms | Teleconsulta',
  baseUrl: 'https://b1.atrys.telemedicina.com/api/', //https://backend.homeclinic.telemedicina.com/api/
  client: 'itms',
  jitsi: 'https://tc-regional-brasil.s3.us-east-1.amazonaws.com/', //meet.bdot.app
  apiKey: '',
  clientSecret: '',
  photoUrlBase: 'https://tc-regional-brasil.s3.us-east-1.amazonaws.com/',//https://itms-prod.s3-sa-east-1.amazonaws.com/
  sessionTime: 600,
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
  ttlSession: 600,
  setup: 'CL',
  version: '{BUILD_VERSION}-Atrys_Chile ',
  colors: {
    "color-primary": "#4680AE;",
    "color-secondary": "#4680ae;",
    "color-hover": "#05A78B;",
  }
};