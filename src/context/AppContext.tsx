import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {appReducer, AppState} from './appReducer';
import {useAnimation} from '../hooks/useAnimation';
import {Platform} from 'react-native';
import {AuthContext} from './authContext';
import {JobData} from '../interfaces/JobInterface';

type AppContextProps = {
  getDirection: (currentOffset: any) => void;
  filterJobByName: (value: string) => void;
  resetFilterJobs: () => void;
  uploadImageStorage: (image: any) => void;
  updateNewOfferJob: (value: string, property: any) => void;
  sendJobToFirebase: () => void;
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
  newJob: {
    title: '',
    jobPlace: '',
    category: '',
    description: '',
    address: '',
    city: '',
    hour: 0,
    coordinate: {
      latitude: 0,
      longitude: 0,
    },
    image: '',
    id: '',
    createdAt: firestore.Timestamp.fromDate(new Date()),
    user: {
      displayName: '',
      email: '',
      photoURL: '',
      phoneNumber: '',
      emailVerified: false,
      uid: '',
    },
  },
};

export const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  const {currentUser} = useContext(AuthContext);
  const [state, dispatch] = useReducer(appReducer, appInitialState);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const {opacity, translateHeader, translateHeaderDown, translate} =
    useAnimation();

  useEffect(() => {
    getJobs();
  }, []);

  //Update newJob with the current user
  useEffect(() => {
    if (currentUser) {
      dispatch({
        type: 'updateJobOffer',
        payload: {field: 'user', data: currentUser},
      });
    }
  }, [currentUser]);

  const getJobs = async () => {
    try {
      setLoading(true);
      firestore()
        .collection('jobs')
        .orderBy('createdAt', 'desc')
        .get()
        .then(querySnapshot => {
          const jobList: JobData[] = querySnapshot.docs.map(doc => {
            return {
              title: doc.data().title,
              jobPlace: doc.data().jobPlace,
              category: doc.data().category,
              description: doc.data().description,
              address: doc.data().address,
              city: doc.data().city,
              hour: doc.data().hour,
              coordinate: doc.data().coordinate,
              image: doc.data().image,
              id: doc.id,
              createdAt: doc.data().createdAt,
              user: doc.data().user,
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
        job.city.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
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
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? image.replace('file://', '') : image;

    const reference = storage().ref(filename);
    const task = reference.putFile(uploadUri);
    setLoading(true);

    task.on('state_changed', snapshot => {
      console.log(`totalBytes: ${snapshot.totalBytes}`);
      console.log(`bytesTransferred: ${snapshot.bytesTransferred}`);
    });

    //Download image and save it into jobs
    task
      .then(async () => {
        console.log('Image Uploaded');

        // Get image url from firebase
        const url = await storage().ref(filename).getDownloadURL();

        dispatch({
          type: 'updateJobOffer',
          payload: {field: 'image', data: url},
        });

        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  const updateNewOfferJob = (value: string, property: any) => {
    dispatch({
      type: 'updateJobOffer',
      payload: {field: value, data: property},
    });
  };

  const sendJobToFirebase = async () => {
    firestore()
      .collection('jobs')
      .add(state.newJob)
      .then(() => {
        console.log('Job added!');

        dispatch({
          type: 'resetNewJob',
        });
      })
      .catch(() => {
        console.log('negativo');
      });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        filterJobByName,
        getDirection,
        resetFilterJobs,
        uploadImageStorage,
        updateNewOfferJob,
        sendJobToFirebase,
        opacity,
        loading,
        translate,
      }}>
      {children}
    </AppContext.Provider>
  );
};
