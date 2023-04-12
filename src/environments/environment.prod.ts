export const environment = {
  firebase: {
    projectId: 'package-tracking-d5e6a',
    appId: '1:953821771942:web:073107843cdeb4e7dc9c67',
    storageBucket: 'package-tracking-d5e6a.appspot.com',
    apiKey: 'AIzaSyBGO_zxGxj6wFSj6yVphR-OO0zWsP0miEA',
    authDomain: 'package-tracking-d5e6a.firebaseapp.com',
    messagingSenderId: '953821771942',
    measurementId: 'G-2V2NGE1HWS',
  },
  production: true,
  apiUrl: 'https://package-tracking-backend.up.railway.app',
  regexEmail:
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
  regexUUID:
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/g,
};
