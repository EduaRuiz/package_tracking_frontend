export const environment = {
  firebase: {
    projectId: 'package-tracking-frontend',
    appId: '1:79835356541:web:abb868ef1ded7e599d4014',
    storageBucket: 'package-tracking-frontend.appspot.com',
    apiKey: 'AIzaSyAoY2k671kmsr9No6y6EFAx0mBNLPuwcS0',
    authDomain: 'package-tracking-frontend.firebaseapp.com',
    messagingSenderId: '79835356541',
    measurementId: 'G-HK8XTGD2W1',
  },
  production: true,
  apiUrl: 'https://package-tracking-backend.up.railway.app',
  // apiUrl: 'http://localhost:3000',
  regexEmail:
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
  regexUUID:
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/g,
};
