import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {JobData} from '../interfaces/JobInterface';
import {JobDetailScreen} from '../screens/JobDetailScreen';
import {MessagesScreen} from '../screens/MessagesScreen';
import {SendMessageScreen} from '../screens/SendMessageScreen';
import {User} from '../interfaces/UserInterface';

export type RootStackParams = {
  HomeScreen: undefined;
  JobDetailScreen: JobData;
  MessagesScreen: undefined;
  SendMessageScreen: User;
};

const Stack = createStackNavigator<RootStackParams>();

export const Tab1 = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerShown: false,
        // header: props => <Header />,
        // headerTransparent: true,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="JobDetailScreen" component={JobDetailScreen} />
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
      <Stack.Screen name="SendMessageScreen" component={SendMessageScreen} />
    </Stack.Navigator>
  );
};
