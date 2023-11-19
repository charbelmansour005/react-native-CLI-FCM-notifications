import firebase from '@react-native-firebase/app';
import {AppRegistry} from 'react-native';
import '@react-native-firebase/app'; // <-- Make sure to add this line

const firebaseConfig = {
  apiKey: 'AIzaSyCD20SedXLdSd0ADbkb0RJMDTOyMIjv6IA',
  authDomain: 'whatsapp-e1078.firebaseapp.com',
  databaseURL: 'https://whatsapp-e1078-default-rtdb.firebaseio.com',
  projectId: 'whatsapp-e1078',
  storageBucket: 'whatsapp-e1078.appspot.com',
  messagingSenderId: '182752442537',
  appId: '1:182752442537:web:9782b8500f9748963bd1b8',
  measurementId: 'G-M78ZY0HD9Q',
};

const FirebaseApp = firebase.initializeApp(firebaseConfig);

export {FirebaseApp};
