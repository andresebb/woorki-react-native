import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from 'react';

// import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
// import {firebaseApp} from '../firebase';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {JobData} from '../interfaces/JobInterface';
import {appReducer, AppState} from './appReducer';
import {useAnimation} from '../hooks/useAnimation';
import {useForm} from '../hooks/useForm';
import {Platform} from 'react-native';
import {AuthContext} from './AuthContext';

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
  bytesTransfered: number;
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
  const {currentUser} = useContext(AuthContext);
  const [state, dispatch] = useReducer(appReducer, appInitialState);
  const [offset, setOffset] = useState(0);
  const [bytesTransfered, setBytesTransferred] = useState(0);
  const [loading, setLoading] = useState(false);
  const {opacity, translateHeader, translateHeaderDown, translate} =
    useAnimation();

  //Job Offer
  const [offerJob, setOfferJob] = useState({
    title: '',
    category: 'Housekeping',
    description: '',
    location: '',
    hour: '',
    email: `${currentUser?.email}`,
    phone: `${currentUser?.phoneNumber}`,
    image: '',
    id: '',
    direction: '',
    coordinate: '',
  });

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
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? image.replace('file://', '') : image;

    const reference = storage().ref(filename);
    const task = reference.putFile(uploadUri);
    setLoading(true);

    task.on('state_changed', snapshot => {
      setBytesTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );
    });

    task
      .then(async () => {
        console.log('Image Uploaded');

        // Get image url from firebase
        const url = await storage().ref(filename).getDownloadURL();
        setOfferJob({
          ...offerJob,
          image: url,
        });

        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  const updateNewOfferJob = (value: string, property: any) => {
    console.log(property);

    setOfferJob({
      ...offerJob,
      [value]: property,
    });
  };

  const sendJobToFirebase = async () => {
    firestore()
      .collection('jobs')
      .add(offerJob)
      .then(() => {
        console.log('User added!');
      })
      .catch(() => {
        console.log('negativo');
      });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        getDirection,
        opacity,
        loading,
        translate,
        bytesTransfered,
        filterJobByName,
        resetFilterJobs,
        uploadImageStorage,
        updateNewOfferJob,
        sendJobToFirebase,
      }}>
      {children}
    </AppContext.Provider>
  );
};
