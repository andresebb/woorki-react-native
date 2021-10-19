import React, {createContext, useEffect, useState, useReducer} from 'react';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {authReducer, AuthState} from './authReducer';
import {User} from '../interfaces/UserInterface';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

type AuthContextProps = {
  signUpFirebase: (registerData: RegisterData) => void;
  signInFirebase: (loginData: LoginData) => void;
  signInwithGoogle: () => void;
  signInwithFacebook: () => void;
  signOutFirebase: () => void;
  loading: boolean;
  currentUser: User | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: null | string;
  errorMessage: string;
};

//TODO CAMBIA EL STATUS A CHECKING
const authInicialState: AuthState = {
  currentUser: null,
  status: 'checking',
  token: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(authReducer, authInicialState);

  // Check if we have user
  useEffect(() => {
    checkUserExist();
  }, [auth().onAuthStateChanged]);

  const checkUserExist = () => {
    setLoading(true);
    auth().onAuthStateChanged(user => {
      if (user) {
        // console.log(user);
        dispatch({
          type: 'signUp',
          payload: {
            token: '12565',
            user: {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              phoneNumber: user.phoneNumber,
              emailVerified: user.emailVerified,
              uid: user.uid,
            },
          },
        });
      } else {
        dispatch({
          type: 'notAuthenticated',
        });
      }
    });
    setLoading(false);
  };

  const signUpFirebase = async ({
    firstName,
    lastName,
    email,
    password,
  }: RegisterData) => {
    try {
      const userCrendential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const user = userCrendential.user;

      await user.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });

      //We called to get user data.
      checkUserExist();
    } catch (error) {
      const errorCode = error;
      const errorMessage = error;
    }
  };

  const signInFirebase = async ({email, password}: LoginData) => {
    try {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Everything good');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //TODO
  const signInwithFacebook = async () => {};

  const signInwithGoogle = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '385049627589-sg9rsitf2vakcetvunhs5dmc0s40fia3.apps.googleusercontent.com',
      });
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('no quizo');
    }
  };

  const signOutFirebase = async () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(e => console.log(e));

    await GoogleSignin.signOut()
      .then(() => console.log('fuera'))
      .catch(e => console.log(e));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUpFirebase,
        signInFirebase,
        signInwithGoogle,
        signInwithFacebook,
        signOutFirebase,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
