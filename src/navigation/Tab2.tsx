import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {UserScreen} from '../screens/UserScreen';
import {CreateJobScreen} from '../screens/CreateJobScreen';
import {CreateJobScreen2} from '../screens/CreateJobScreen2';

const Stack = createStackNavigator();

export const Tab2 = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="CreateJobScreen2" component={CreateJobScreen2} />
      <Stack.Screen name="CreateJobScreen" component={CreateJobScreen} />
    </Stack.Navigator>
  );
};
