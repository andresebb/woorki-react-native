import {JobData} from '../interfaces/JobInterface';
import {User} from '../interfaces/UserInterface';

export interface AppState {
  jobs: JobData[];
  filterJobs: JobData[];
  favorites: JobData[];
  newJob: JobData;
  allUsers: User[];
}

type AppAction =
  | {type: 'getJobs'; payload: {jobs: JobData[]}}
  | {type: 'setAllUsers'; payload: {allUsers: User[]}}
  | {type: 'filterJob'; payload: {filterJob: JobData[]}}
  | {type: 'resetFilterJobs'}
  | {type: 'updateJobOffer'; payload: {field: string; data: any}}
  | {type: 'resetNewJob'};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'getJobs':
      return {
        ...state,
        filterJobs: [],
        jobs: action.payload.jobs,
      };
    case 'setAllUsers':
      return {
        ...state,
        allUsers: action.payload.allUsers,
      };
    case 'filterJob':
      console.log(action.payload.filterJob);

      return {
        ...state,
        filterJobs: action.payload.filterJob,
      };

    case 'resetFilterJobs':
      return {
        ...state,
        filterJobs: [],
      };

    case 'updateJobOffer':
      return {
        ...state,
        newJob: {
          ...state.newJob,
          [action.payload.field]: action.payload.data,
        },
      };

    case 'resetNewJob':
      return {
        ...state,
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
          createdAt: new Date(),
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

    default:
      return state;
  }
};
