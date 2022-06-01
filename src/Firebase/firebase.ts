import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {firebaseConfig} from '../firebaseConfig.env';

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
export {auth}
