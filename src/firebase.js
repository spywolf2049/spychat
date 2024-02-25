import firebase from 'firebase/app';  //firebase/app

import 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyBYLRieDgjBmKJTsaBXrFP2i05cpex3bu4",
    authDomain: "spychat-47cba.firebaseapp.com",
    projectId: "spychat-47cba",
    storageBucket: "spychat-47cba.appspot.com",
    messagingSenderId: "437280583573",
    appId: "1:437280583573:web:81108914487901ab7a909c",
    measurementId: "G-0YRTNYHDMV"
  }).auth();