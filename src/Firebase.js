import * as firebase from 'firebase';

const settings = {};

const config = {
    apiKey: "AIzaSyBNtfu70bVaj2KiA0Tlpv7rSiFxQGt_His",
    authDomain: "chall-counter.firebaseapp.com",
    databaseURL: "https://chall-counter.firebaseio.com",
    projectId: "chall-counter",
    storageBucket: "chall-counter.appspot.com",
    messagingSenderId: "223353068983"
  };
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;