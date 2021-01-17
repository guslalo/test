export const environment = {
  production: true,
  defaultLang: 'es',
  checkAge: false,
  title: 'Itms | Teleconsulta',
  baseUrl: 'https://backend-dev-cl.bdot.app/api/', // para backend en cl
  // baseUrl: 'https://backend-dev-br.bdot.app/api/', // para backend en br
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
  ttlSession: 900,
  setup: 'CL',
  version: '{BUILD_VERSION}-Chile',
  brand: "atrys",
  colors: {
    "color-primary": "#4680AE;",
    "color-secondary": "#4680ae;",
    "color-hover": "#05A78B;"
  }
};
