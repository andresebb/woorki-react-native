import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {DetailScreen} from '../screens/DetailScreen';
import {ListHeader} from '../components/ListHeader';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Tab1 = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        title: 'hola',
        cardStyle: {
          backgroundColor: '#f1f1f1',
        },
      }}>
      {/* TODO: DEFINIR DONDE SE VERA EL HEADER */}
      <Stack.Screen
        options={{
          headerShown: true,
          // headerShown: false,
          header: props => <ListHeader />,
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};
