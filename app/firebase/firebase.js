import * as firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'
import firebaseConfig from './firebaseConfig';

const app = firebase.initializeApp(firebaseConfig)

export default app

