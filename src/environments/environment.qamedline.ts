export const environment = {
  production: true,
  defaultLang: 'pt',
  checkAge: false,
  title: 'Itms | Teleconsulta',
  FrontBaseUrl: "http://homeclinic.telemedicina.com/",
  baseUrl: 'https://b1qa.medline.telemedicina.com/api/', //https://backend.homeclinic.telemedicina.com/api/
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
  ttlSession: 60,
  setup: 'BR',
  version: '{BUILD_VERSION}-Medline ',
  brand: "medline",
  colors: {
    "color-primary": "#394184;",
    "color-secondary": "#D03B34;",
    "color-hover": "#77787B;"
  }
};
