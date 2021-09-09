import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore/lite';

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
const firebaseConfig = {
  apiKey: 'AIzaSyBCshcE80113uC1n4hmOe55Dnaa4s3iGLc',
  authDomain: 'woorki-ve.firebaseapp.com',
  databaseURL: 'https://woorki-ve.firebaseio.com',
  projectId: 'woorki-ve',
  storageBucket: 'woorki-ve.appspot.com',
  messagingSenderId: '385049627589',
  appId: '1:385049627589:web:78eb34ddabc2a6dcc319ac',
  measurementId: 'G-01XBR2CTS2',
};

export const firebaseApp = initializeApp(firebaseConfig);
