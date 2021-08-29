import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {JobData} from '../interfaces/JobInterface';
import {Header} from '../components/Header';
import {JobDetailScreen} from '../screens/JobDetailScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: undefined;
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
        header: props => <Header />,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="JobDetailScreen"
        options={{
          headerShown: false,
        }}
        component={JobDetailScreen}
      />
    </Stack.Navigator>
  );
};
