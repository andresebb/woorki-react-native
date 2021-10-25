import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';

import {appReducer, AppState} from './appReducer';
import {useAnimation} from '../hooks/useAnimation';
import {Platform} from 'react-native';
import {AuthContext} from './authContext';
import {JobData} from '../interfaces/JobInterface';
import {User} from '../interfaces/UserInterface';
import {whileStatement} from '@babel/types';

//Lo que exponemos en el context
type AppContextProps = {
  getDirection: (currentOffset: any) => void;
  filterJobByName: (value: string) => void;
  resetFilterJobs: () => void;
  uploadImageStorage: (image: any) => void;
  updateNewOfferJob: (value: string, property: any) => void;
  sendJobToFirebase: () => void;
  selectChat: (user?: User, allUserGoing?: User[]) => void;
  opacity: any;
  translate: any;
  loading: boolean;
  jobs: JobData[];
  filterJobs: JobData[];
  favorites: JobData[];
  allUsers: User[];
  chatsActives: User[];
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
  allUsers: [],
};

export const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(appReducer, appInitialState);
  const {currentUser} = useContext(AuthContext);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [chatsActives, setChatActives] = useState<User[]>([]);
  const {opacity, translateHeader, translateHeaderDown, translate} =
    useAnimation();

  useEffect(() => {
    getJobs();
  }, []);

  //Watch User collection
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .where('uid', '!=', `${currentUser?.uid}`)
      .onSnapshot(documentSnapshot => {
        let users: any[] = [];
        documentSnapshot.forEach(doc => {
          users.push(doc.data());
        });
        dispatch({
          type: 'setAllUsers',
          payload: {allUsers: users},
        });
        selectChat(undefined, users);
      });

    // // Stop listening for updates when no longer required
    return () => subscriber();
  }, [currentUser?.uid]);

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

  //It's crazy I know
  const selectChat = (userToChat?: User, allUserGoing?: User[]) => {
    try {
      let usersTotalk: any[] = [];

      //Add user to Chat Actives.
      if (userToChat) {
        const userToAdd = state.allUsers.filter(data => {
          if (data.uid === userToChat.uid) return data;
        });

        firestore()
          .collection(`chatsActives-${currentUser?.uid}`)
          .doc(userToAdd[0].uid)
          .set(userToAdd[0])
          .then(querySnapchot => {
            console.log('Chat actives added');
          });
      }

      //Get Users from chatActives and setChatActives
      if (allUserGoing) {
        firestore()
          .collection(`chatsActives-${currentUser?.uid}`)
          .get()
          .then(snapshot => {
            let userArray: any[] = [];
            snapshot.forEach(doc => {
              userArray.push(doc.data());
            });
            setChatActives(userArray);

            //We put the type of user from AllUser in chatActives
            //So we can know when the user is online
            const usersWithChatActives = allUserGoing.filter((data: any) => {
              for (let i = 0; i < userArray.length; i++) {
                if (data.uid === userArray[i].uid) return data;
              }
            });

            setChatActives(usersWithChatActives);
          });
      }
    } catch (e) {
      console.log(e);
    }
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
        selectChat,
        opacity,
        loading,
        translate,
        chatsActives,
      }}>
      {children}
    </AppContext.Provider>
  );
};
