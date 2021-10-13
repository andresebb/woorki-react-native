import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {CreateJobScreen} from '../screens/CreateJobScreen';
import {CreateJobScreen2} from '../screens/CreateJobScreen2';
import {CreateJobScreen3} from '../screens/CreateJobScreen3';

export type RootStackParams = {
  CreateJobScreen: undefined;
  CreateJobScreen2: undefined;
  CreateJobScreen3: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Tab2 = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="CreateJobScreen3" component={CreateJobScreen3} />
      <Stack.Screen name="CreateJobScreen" component={CreateJobScreen} />
      <Stack.Screen name="CreateJobScreen2" component={CreateJobScreen2} />
    </Stack.Navigator>
  );
};
