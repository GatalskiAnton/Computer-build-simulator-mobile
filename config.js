import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAcu5vHZFPeBR9o84H86ws1aqDJYVNXXAs",
    authDomain: "pcbg-eaf0a.firebaseapp.com",
    projectId: "pcbg-eaf0a",
    storageBucket: "pcbg-eaf0a.appspot.com",
    messagingSenderId: "428376461010",
    appId: "1:428376461010:web:d65429f610efffc8e5e70b",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }