// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { authState } from 'rxfire/auth';
import {getAuth} from 'firebase/auth'
import {filter} from 'rxjs';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAPBd1RS5KKXLmvBSVHB0e3GIbJHwX_Nlc',
    authDomain: 'weatherapp-9ffa0.firebaseapp.com',
    projectId: 'weatherapp-9ffa0',
    storageBucket: 'weatherapp-9ffa0.appspot.com',
    messagingSenderId: '7546937149',
    appId: '1:7546937149:web:ecbfff8602e77de7ea6f54',
    measurementId: 'G-RE5ML33910'
};

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const Auth = getAuth()
const loggedIn$ = authState(Auth).pipe(filter(user => !!user))
export {auth, loggedIn$}