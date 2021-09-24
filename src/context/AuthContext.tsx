import React, {createContext, useEffect, useState, useReducer} from 'react';

import {
  getAuth,
  updateProfile,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {firebaseApp} from '../firebase';

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

const authInicialState: AuthState = {
  currentUser: null,
  status: 'checking',
  token: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const auth = getAuth(firebaseApp);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(authReducer, authInicialState);

  const googleProvider = new GoogleAuthProvider();

  //Check if we have user
  useEffect(() => {
    checkUserExist();
  }, [onAuthStateChanged]);

  const checkUserExist = () => {
    onAuthStateChanged(auth, user => {
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
  };

  const signUpFirebase = async ({
    firstName,
    lastName,
    email,
    password,
  }: RegisterData) => {
    try {
      const userCrendential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCrendential.user;
      updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });
    } catch (error) {
      const errorCode = error;
      const errorMessage = error;
    }
  };

  const signInFirebase = async ({email, password}: LoginData) => {
    try {
      setLoading(true);
      const userCrendential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCrendential.user;
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const signInwithGoogle = () => {};

  //TODO: MAKE GOOGLE SING IN
  const signOutFirebase = () => {
    signOut(auth)
      .then(() => {
        console.log('Estas fuera');
      })
      .catch(error => {
        console.log(error);
      });
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
