import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {MapScreen} from '../screens/MapScreen';
import {JobDetailScreen} from '../screens/JobDetailScreen';
import {JobData} from '../interfaces/JobInterface';
import {MessagesScreen} from '../screens/MessagesScreen';
import {SendMessageScreen} from '../screens/SendMessageScreen';
import {User} from '../interfaces/UserInterface';

export type RootStackParams = {
  MessagesScreen: undefined;
  SendMessageScreen: User;
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
      <Stack.Screen name="SendMessageScreen" component={SendMessageScreen} />
    </Stack.Navigator>
  );
};
