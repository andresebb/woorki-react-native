import React, {createContext, useEffect, useState, useReducer} from 'react';

import auth from '@react-native-firebase/auth';

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
  status: 'not-authenticated',
  token: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(authReducer, authInicialState);

  // const googleProvider = new GoogleAuthProvider();

  // Check if we have user
  useEffect(() => {
    checkUserExist();
  }, [auth().onAuthStateChanged]);

  const checkUserExist = () => {
    setLoading(true);
    auth().onAuthStateChanged(user => {
      if (user) {
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

  const signInwithGoogle = () => {};

  //TODO: MAKE GOOGLE SING IN
  const signOutFirebase = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(e => console.log(e));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loading,
        signUpFirebase,
        signInFirebase,
        signInwithGoogle,
        signOutFirebase,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
