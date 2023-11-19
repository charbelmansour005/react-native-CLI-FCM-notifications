/**
 * @format
 */

import '@react-native-firebase/app'; // <-- Make sure to add this line
import firebase from '@react-native-firebase/app';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const firebaseConfig = {
  // <--- get these creds from firebase.google.com
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
  // <--- get these creds from firebase.google.com
};

firebase.initializeApp(firebaseConfig);
AppRegistry.registerComponent(appName, () => App);
