import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {MapScreen} from '../screens/MapScreen';
import {JobDetailScreen} from '../screens/JobDetailScreen';
import {JobData} from '../interfaces/JobInterface';
import {MessagesScreen} from '../screens/MessagesScreen';

export type RootStackParams = {
  MessagesScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Tab4 = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
    </Stack.Navigator>
  );
};
