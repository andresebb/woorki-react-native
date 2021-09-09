import React, {createContext, useState, useEffect} from 'react';

import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from 'firebase/firestore/lite';

import {useAnimation} from '../hooks/useAnimation';
import {firebaseApp} from '../firebase';
import {AuthContext} from './AuthContext';
import {JobData} from '../interfaces/JobInterface';

type AppContextProps = {
  getDirection: (currentOffset: any) => void;
  opacity: any;
  jobs: DocumentData[];
};

export const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  const db = getFirestore(firebaseApp);

  const [offset, setOffset] = useState(0);
  const {opacity, fadeIn, fadeOut} = useAnimation();
  const [jobs, setJobs] = useState<DocumentData[]>([]);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const jobsCol = collection(db, 'jobs');
      const jobSnapshot = await getDocs(jobsCol);
      const jobList = jobSnapshot.docs.map(doc => doc.data());
      setJobs([jobList]);
    } catch (error) {
      console.log(error);
    }
  };

  //Show or hide Header
  const getDirection = (currentOffset: any) => {
    // console.log(currentOffset);
    if (currentOffset > 30) {
      if (currentOffset > offset) {
        fadeOut();
      }

      if (currentOffset < offset) {
        fadeIn();
      }

      setOffset(currentOffset);
    }
  };

  return (
    <AppContext.Provider value={{getDirection, opacity, jobs}}>
      {children}
    </AppContext.Provider>
  );
};
