import firebase from 'firebase';
 // Initialize Firebase
 var config = {
   apiKey: "AIzaSyDpVTkONJ49aSRVCWKrL0ELVsCl644TiDQ",
   authDomain: "guessrightnumber.firebaseapp.com",
   databaseURL: "https://guessrightnumber.firebaseio.com",
   projectId: "guessrightnumber",
   storageBucket: "guessrightnumber.appspot.com",
   messagingSenderId: "776067282353"
 };
 
 const fb = firebase.initializeApp(config);
 const db = firebase.database();

 export {db, fb};
