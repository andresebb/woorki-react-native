import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {MapScreen} from '../screens/MapScreen';
import {JobDetailScreen} from '../screens/JobDetailScreen';
import {JobData} from '../interfaces/JobInterface';

export type RootStackParams = {
  MapScreen: undefined;
  JobDetailScreen: JobData;
};

const Stack = createStackNavigator<RootStackParams>();

export const Tab3 = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="JobDetailScreen" component={JobDetailScreen} />
    </Stack.Navigator>
  );
};
