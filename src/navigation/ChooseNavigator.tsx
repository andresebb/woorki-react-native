import React, {useContext} from 'react';

import {AuthContext} from '../context/AuthContext';
import {BottomNavigator} from './BottomNavigator';
import {WelcomeNavigator} from './WelcomeNavigator';
import {DrawerNavigation} from './DrawerNavigation';

//We did chooseNavigator because we were not allow to do the if in the app.tsx
export const ChooseNavigator = () => {
  const {status} = useContext(AuthContext);

  if (status.status !== 'authenticated') {
    return <WelcomeNavigator />;
  } else {
    return <DrawerNavigation />;
  }
};
