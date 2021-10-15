import {JobData} from '../interfaces/JobInterface';

export interface AppState {
  jobs: JobData[];
  filterJobs: JobData[];
  favorites: [];
}

type AppAction =
  | {type: 'getJobs'; payload: {jobs: JobData[]}}
  | {type: 'filterJob'; payload: {filterJob: JobData[]}}
  | {type: 'resetFilterJobs'}
  | {type: 'updateJobOffer'; paylod: any};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'getJobs':
      return {
        ...state,
        filterJobs: [],
        jobs: action.payload.jobs,
      };
    case 'filterJob':
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
      };

    default:
      return state;
  }
};
