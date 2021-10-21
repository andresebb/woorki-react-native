import {User} from '../interfaces/UserInterface';

export interface AuthState {
  currentUser: User | undefined;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
}

type AuthAction =
  | {type: 'signUp'; payload: {token: string; user: User}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'notAuthenticated'}
  | {type: 'logout'};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'signUp':
      return {
        ...state,
        currentUser: action.payload.user,
        status: 'authenticated',
      };

    case 'notAuthenticated':
      return {
        ...state,
        currentUser: undefined,
        status: 'not-authenticated',
        token: null,
      };

    default:
      return state;
  }
};
