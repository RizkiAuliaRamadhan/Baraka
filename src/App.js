import React from 'react';
import Routes from './routes';
import firebase from '@react-native-firebase/app';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import store from './reducer/store';
import { StatusBar } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyAxdzGV_QKyeQBJrWikTvijciInc0WEaJ4",
  authDomain: "philantropiapp.firebaseapp.com",
  projectId: "philantropiapp",
  storageBucket: "philantropiapp.appspot.com",
  messagingSenderId: "23942723308",
  appId: "1:23942723308:web:160a65b7707676222957c9",
  measurementId: "G-19B5PTV77D"
};

if(!firebase.app.length) {
  firebase.initializeApp(firebaseConfig)
}

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Routes />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
