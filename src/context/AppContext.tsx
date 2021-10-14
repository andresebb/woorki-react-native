import React, {createContext, useState, useEffect, useReducer} from 'react';

// import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
// import {firebaseApp} from '../firebase';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {JobData} from '../interfaces/JobInterface';
import {appReducer, AppState} from './appReducer';
import {useAnimation} from '../hooks/useAnimation';

type AppContextProps = {
  getDirection: (currentOffset: any) => void;
  filterJobByName: (value: string) => void;
  resetFilterJobs: () => void;
  uploadImageStorage: (image: any) => void;
  opacity: any;
  translate: any;
  loading: boolean;
  jobs: JobData[];
  filterJobs: JobData[];
  favorites: JobData[];
};

const appInitialState: AppState = {
  jobs: [],
  filterJobs: [],
  favorites: [],
};

export const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  // const db = getFirestore(firebaseApp);

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
      firestore()
        .collection('jobs')
        .get()
        .then(querySnapshot => {
          const jobList: JobData[] = querySnapshot.docs.map(doc => {
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
        });

      setLoading(false);
    } catch (e) {
      console.log(e);
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

  const filterJobByName = (value: string) => {
    setLoading(true);
    const jobsFilter = state.jobs.filter(
      job =>
        job.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
        job.description
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase()) ||
        job.location.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    );
    dispatch({
      type: 'filterJob',
      payload: {filterJob: jobsFilter},
    });
    setLoading(false);
  };

  const resetFilterJobs = () => {
    dispatch({
      type: 'resetFilterJobs',
    });
  };

  const uploadImageStorage = async (image: any) => {
    const reference = storage().ref('woorki/post/miImagenBonita.png');
    await reference.putFile(image);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        getDirection,
        opacity,
        loading,
        translate,
        filterJobByName,
        resetFilterJobs,
        uploadImageStorage,
      }}>
      {children}
    </AppContext.Provider>
  );
};
