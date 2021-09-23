import {JobData} from '../interfaces/JobInterface';

export interface AppState {
  jobs: JobData[];
  filterJobByName: JobData[];
  favorites: [];
}

type AppAction =
  | {type: 'getJobs'; payload: {jobs: JobData[]}}
  | {type: 'filterJob'; payload: []}
  | {type: 'favorites'; payload: []};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'getJobs':
      return {
        ...state,
        jobs: action.payload.jobs,
      };
    case 'filterJob':
      return {
        ...state,
        filterJobByName: action.payload,
      };

    default:
      return state;
  }
};
