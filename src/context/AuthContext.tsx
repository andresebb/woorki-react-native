import React, {createContext} from 'react';
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
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
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const auth = getAuth(firebaseApp);
  const [status, setStatus] = useState<Status>({
    status: 'not-authenticated',
  });

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
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const signInFirebase = async ({email, password}: LoginData) => {
    try {
      const userCrendential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setStatus({
        status: 'authenticated',
      });
      const user = userCrendential.user;
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  return (
    <AuthContext.Provider value={{signUpFirebase, signInFirebase, status}}>
      {children}
    </AuthContext.Provider>
  );
};
