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
import {User} from '../interfaces/UserInterface';
import {Message} from '../interfaces/MessagesInterface';

//Lo que exponemos en el context
type AppContextProps = {
  getDirection: (currentOffset: any) => void;
  filterJobByName: (value: string) => void;
  resetFilterJobs: () => void;
  uploadImageStorage: (image: any) => void;
  updateNewOfferJob: (value: string, property: any) => void;
  sendJobToFirebase: () => void;
  addUserToChatActive: (users: User) => void;
  sendMessageToUser: (user: User, text: string) => void;
  getChatWithUser: (user: User) => void;
  destroyChatWithUser: () => void;
  openLastMessage: () => void;
  opacity: any;
  translate: any;
  loading: boolean;
  jobs: JobData[];
  filterJobs: JobData[];
  favorites: JobData[];
  allUsers: User[];
  chatsActives: User[];
  chatsWithUser: Message[];
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
  const [chatsActives, setChatsActives] = useState<User[]>([]);
  const [chatsWithUser, setChatsWithUser] = useState<Message[]>([]);
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
        getUsersWithChatActive(users);
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

  //TODO: ADD THE USER TO THE USER YOU ARE SENDING THE MESSAGE TO
  const addUserToChatActive = async (user: User) => {
    try {
      const user1Id = currentUser?.uid;
      const user2Id = user.uid;

      // Add user2 to user1
      firestore()
        .collection('chatActives')
        .doc(user1Id)
        .collection('users')
        .add(user)
        .then(() => {
          console.log('User added!');
        })
        .catch(e => {
          console.log(e);
        });

      //Add user1 to user2
      firestore()
        .collection('chatActives')
        .doc(user2Id)
        .collection('users')
        .add(currentUser)
        .then(() => {
          console.log('User added!');
        })
        .catch(e => {
          console.log(e);
        });

      //TODO: WHY WE DONT JUST PASS THE USER WHO WE ARE GONNA TALK WITH?
      getUsersWithChatActive(state.allUsers);
    } catch (e) {
      console.log(e);
    }
  };

  const getUsersWithChatActive = (users: User[]) => {
    firestore()
      .collection('chatActives')
      .doc(currentUser?.uid)
      .collection('users')
      .get()
      .then(snapshot => {
        let userArray: any[] = [];
        snapshot.forEach(doc => {
          userArray.push(doc.data());
        });
        //We put the type of user from Users collection in chatActives
        //So we can know when the user is online
        const usersWithChatActives = users.filter((data: any) => {
          for (let i = 0; i < userArray.length; i++) {
            if (data.uid === userArray[i].uid) return data;
          }
        });

        setChatsActives(usersWithChatActives);
      })
      .catch(e => {
        console.log(e);
      });
  };

  //TODO: MAKE THE LAST MESSAGE SHOW
  const sendMessageToUser = async (user: User, text: string) => {
    const user1Id = currentUser!.uid;
    const user2Id = user.uid;

    if (user1Id && user2Id) {
      const id =
        user1Id > user2Id ? `${user1Id + user2Id}` : `${user2Id + user1Id}`;

      await firestore()
        .collection('Messages')
        .doc(id)
        .collection('chat')
        .add({
          text,
          from: user1Id,
          to: user2Id,
          createdAt: firestore.Timestamp.fromDate(new Date()),
          media: null,
        })
        .then(() => {
          console.log('User added!');
        });

      firestore()
        .collection('lastMsg')
        .doc(id)
        .set({
          text,
          from: user1Id,
          to: user2Id,
          createdAt: firestore.Timestamp.fromDate(new Date()),
          media: null,
          unread: true,
        });
    }
  };

  const getChatWithUser = (user: User) => {
    const user1 = currentUser?.uid;
    const user2 = user.uid;

    if (user1 && user2) {
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      firestore()
        .collection('Messages')
        .doc(id)
        .collection('chat')
        .orderBy('createdAt', 'asc')
        .onSnapshot(documentSnapshot => {
          let messages: any[] = [];
          documentSnapshot.forEach(doc => {
            messages.push({
              createdAt: doc.data().createdAt,
              from: doc.data().from,
              to: doc.data().to,
              text: doc.data().text,
              media: doc.data().media,
              id: doc.id,
            });
          });
          setChatsWithUser(messages);
        });
    }
  };

  const destroyChatWithUser = () => {
    setChatsWithUser([]);
  };

  const openLastMessage = () => {};

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
        addUserToChatActive,
        sendMessageToUser,
        getChatWithUser,
        destroyChatWithUser,
        openLastMessage,
        opacity,
        loading,
        translate,
        chatsActives,
        chatsWithUser,
      }}>
      {children}
    </AppContext.Provider>
  );
};
