import React, {createContext, useEffect, useState, useReducer} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
  signOutFirebase: () => void;
  resetUserPassword: (email: string) => void;
  loading: boolean;
  currentUser: User | undefined;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: null | string;
  errorMessage: string;
};

//TODO CAMBIA EL STATUS A CHECKING
const authInicialState: AuthState = {
  currentUser: undefined,
  status: 'checking',
  token: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

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

      //We called to get CurrentUser state data.
      checkUserExist();

      //Save Users in the DB
      firestore()
        .collection('Users')
        .doc(user.uid)
        .set({
          displayName: `${firstName} ${lastName}`,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          emailVerified: user.emailVerified,
          uid: user.uid,
          isOnline: true,
          createdAt: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log('User added!');
        })
        .catch(e => {
          console.log('No User add');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const signInFirebase = async ({email, password}: LoginData) => {
    try {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(data => {
          console.log('Everything good');
          // Set IsOnline to true
          firestore()
            .collection('Users')
            .doc(data.user.uid)
            .update({
              isOnline: true,
            })
            .then(() => {
              console.log('User updated!');
            });
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

  //Once you Login with google, you can't use your email login again.
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
      const data = await auth().signInWithCredential(googleCredential);

      if (data.additionalUserInfo?.isNewUser === true) {
        firestore()
          .collection('Users')
          .doc(data.user.uid)
          .set({
            displayName: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL,
            phoneNumber: data.user.phoneNumber,
            emailVerified: data.user.emailVerified,
            uid: data.user.uid,
            isOnline: true,
            createdAt: firestore.Timestamp.fromDate(new Date()),
          })
          .then(() => {
            console.log('User added!');
          })
          .catch(e => {
            console.log('No User add');
          });
      } else {
        firestore()
          .collection('Users')
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            console.log('User updated!');
          })
          .catch(e => {
            console.log('No User updated');
            console.log(e);
          });
      }
    } catch (error) {
      console.log('no quizo');
    }
  };

  //TODO: SIGNOUT GOOGLE
  const signOutFirebase = async () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(e => console.log(e));

    await GoogleSignin.signOut()
      .then(() => console.log('fuera'))
      .catch(e => console.log(e));

    firestore()
      .collection('Users')
      .doc(state.currentUser?.uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        console.log('User updated!');
      })
      .catch(e => {
        console.log('No User updated');
        console.log(e);
      });
  };

  const resetUserPassword = (email: string) => {
    if (email) {
      auth()
        .sendPasswordResetEmail(email)
        .then(function (user) {
          console.log('please check your email');
        })
        .catch(function (e) {
          console.log(e);
        });
    } else {
      console.log('write your email');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUpFirebase,
        signInFirebase,
        signInwithGoogle,
        signOutFirebase,
        resetUserPassword,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
