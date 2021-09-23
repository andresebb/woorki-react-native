import React, {createContext, useState, useEffect, useReducer} from 'react';

import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';

import {useAnimation} from '../hooks/useAnimation';
import {firebaseApp} from '../firebase';
import {JobData} from '../interfaces/JobInterface';
import {appReducer, AppState} from './appReducer';

type AppContextProps = {
  getDirection: (currentOffset: any) => void;
  opacity: any;
  translate: any;
  loading: boolean;
  jobs: JobData[];
  filterJobByName: JobData[];
  favorites: JobData[];
};

const appInitialState: AppState = {
  jobs: [],
  filterJobByName: [],
  favorites: [],
};

export const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  const db = getFirestore(firebaseApp);

  const [state, dispatch] = useReducer(appReducer, appInitialState);

  // const [jobs, setJobs] = useState<JobData[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const {opacity, translateHeader, translateHeaderDown, translate} =
    useAnimation();

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
          coordinate: doc.data().coordinate,
        };
      });

      dispatch({
        type: 'getJobs',
        payload: {jobs: jobList},
      });

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
        translateHeader();
      }

      if (currentOffset < offset) {
        translateHeaderDown();
      }

      setOffset(currentOffset);
    }
  };

  return (
    <AppContext.Provider
      value={{...state, getDirection, opacity, loading, translate}}>
      {children}
    </AppContext.Provider>
  );
};
