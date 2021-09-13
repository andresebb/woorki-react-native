import React, {createContext} from 'react';

import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {firebaseApp} from '../firebase';

import {useState} from 'react';
import {Status} from '../interfaces/Status';

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
  status: Status;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const auth = getAuth(firebaseApp);
  const [status, setStatus] = useState<Status>({
    status: 'authenticated',
  });

  const [loading, setLoading] = useState(false);

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
      setStatus({
        status: 'authenticated',
      });
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
      setStatus({
        status: 'authenticated',
      });
      const user = userCrendential.user;
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{signUpFirebase, signInFirebase, status, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
