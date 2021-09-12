import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {JobData} from '../interfaces/JobInterface';
import {Header} from '../components/Header';
import {JobDetailScreen} from '../screens/JobDetailScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  JobDetailScreen: JobData;
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
    </Stack.Navigator>
  );
};
