import firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAF-YprMA2JlqrjBTW5W1wQRoubFr2oSKE",
    authDomain: "zeus-f7474.firebaseapp.com",
    databaseURL: "https://zeus-f7474.firebaseio.com",
    projectId: "zeus-f7474",
    storageBucket: "zeus-f7474.appspot.com",
    messagingSenderId: "1098735786333",
    appId: "1:1098735786333:web:cc2169ffe6a3afea0630b4",
    measurementId: "G-42NWY1RQFH"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export { firebase as firebaseModule };

