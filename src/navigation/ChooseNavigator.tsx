import React, {useContext} from 'react';

import {AuthContext} from '../context/AuthContext';
import {WelcomeNavigator} from './WelcomeNavigator';
import {DrawerNavigation} from './DrawerNavigation';
import {LoadingModal} from '../components/loadingModal';

//We did chooseNavigator because we were not allow to do the if in the app.tsx
export const ChooseNavigator = () => {
  const {status, currentUser} = useContext(AuthContext);

  if (status === 'checking') return <LoadingModal />;

  if (status !== 'authenticated' && !currentUser) {
    return <WelcomeNavigator />;
  } else {
    return <DrawerNavigation />;
  }
};
