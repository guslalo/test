export const environment = {
  production: false,
  defaultLang: 'pt',
  checkAge: false,
  title: 'Itms Dev | Teleconsulta',
  FrontBaseUrl: "http://dev.bdot.app/",
  baseUrl: 'https://backend-dev-br.bdot.app/api/', // para backend en cl
  // baseUrl: 'https://backend-dev-cl.bdot.app/api/', // para backend en br
  // baseUrl: 'https://backend-dev.bdot.app/api/', //https://backend.homeclinic.telemedicina.com/api/
  client: 'itms',
  jitsi: 'meet.bdot.app', //meet.bdot.app
  photoUrlBase: 'https://itms-dev.s3-sa-east-1.amazonaws.com/',
  sessionTime: 1200,
  apiKey: '',
  clientSecret: '',
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
  version: '{BUILD_VERSION}-dev',
  brand: "medic",
  colors: {
    "color-primary": "#25b0bb;",
    "color-secondary": "#044AAB;",
    "color-hover": "#044AAB;"
  }
};
