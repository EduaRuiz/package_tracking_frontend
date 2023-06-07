// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
  production: false,
  apiUrl: 'https://package-tracking-backend.up.railway.app',
  // apiUrl: 'http://localhost:3000',
  regexEmail:
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
  regexUUID:
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/g,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
