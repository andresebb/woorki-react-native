import React, {createContext, useState, useEffect} from 'react';

import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from 'firebase/firestore/lite';

import {useAnimation} from '../hooks/useAnimation';
import {firebaseApp} from '../firebase';
import {JobData} from '../interfaces/JobInterface';

type AppContextProps = {
  getDirection: (currentOffset: any) => void;
  opacity: any;
  translate: any;
  jobs: JobData[];
  loading: boolean;
};

export const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  const db = getFirestore(firebaseApp);

  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    opacity,
    fadeIn,
    fadeOut,
    translateHeader,
    translateHeaderDown,
    translate,
  } = useAnimation();
  const [jobs, setJobs] = useState<JobData[]>([]);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      setLoading(true);
      const jobsCol = collection(db, 'jobs');
      const jobSnapshot = await getDocs(jobsCol);

      const jobList: JobData[] = jobSnapshot.docs.map(doc => {
        return {
          title: doc.data().title,
          direction: doc.data().direction,
          description: doc.data().description,
          location: doc.data().location,
          hour: doc.data().hour,
          email: doc.data().email,
          phone: doc.data().phone,
          image: doc.data().image,
          id: doc.id,
        };
      });

      setJobs(jobList);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Show or hide Header
  const getDirection = (currentOffset: any) => {
    // console.log(currentOffset);
    if (currentOffset > 30) {
      if (currentOffset > offset) {
        // fadeOut();
        translateHeader();
      }

      if (currentOffset < offset) {
        translateHeaderDown();
        // fadeIn();
      }

      setOffset(currentOffset);
    }
  };

  return (
    <AppContext.Provider
      value={{getDirection, opacity, jobs, loading, translate}}>
      {children}
    </AppContext.Provider>
  );
};
